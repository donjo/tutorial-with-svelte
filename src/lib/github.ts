/**
 * GitHub API service for fetching pull request data
 */

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  state: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  user: {
    login: string;
  };
}

export interface PRStats {
  totalPRs: number;
  mergedPRs: number;
  closedPRs: number;
  openPRs: number;
  mergeRate: number;
  prsPerMonth: number;
  startDate: string;
  endDate: string;
}

export interface PRComparison {
  current: PRStats;
  previous: PRStats;
  rateChange: number;
  rateChangePercent: number;
}

/**
 * Fetch pull requests for a user from GitHub
 */
export async function fetchUserPullRequests(
  username: string,
  token: string,
  since?: Date,
  until?: Date
): Promise<PullRequest[]> {
  const prs: PullRequest[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = new URL('https://api.github.com/search/issues');

    // Build search query
    let query = `author:${username} type:pr`;
    if (since) {
      query += ` created:>=${since.toISOString().split('T')[0]}`;
    }
    if (until) {
      query += ` created:<=${until.toISOString().split('T')[0]}`;
    }

    url.searchParams.set('q', query);
    url.searchParams.set('sort', 'created');
    url.searchParams.set('order', 'desc');
    url.searchParams.set('per_page', perPage.toString());
    url.searchParams.set('page', page.toString());

    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'GitHub-Stats-App'
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`GitHub API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const items = data.items as PullRequest[];

    if (items.length === 0) break;

    prs.push(...items);

    // If we got fewer items than requested, we've reached the end
    if (items.length < perPage) break;

    page++;

    // GitHub API rate limiting - be cautious
    if (page > 10) break; // Safety limit
  }

  return prs;
}

/**
 * Calculate statistics for a set of pull requests
 */
export function calculatePRStats(
  prs: PullRequest[],
  startDate: Date,
  endDate: Date
): PRStats {
  const totalPRs = prs.length;
  const mergedPRs = prs.filter(pr => pr.merged_at !== null).length;
  const closedPRs = prs.filter(pr => pr.state === 'closed' && pr.merged_at === null).length;
  const openPRs = prs.filter(pr => pr.state === 'open').length;

  const mergeRate = totalPRs > 0 ? (mergedPRs / totalPRs) * 100 : 0;

  // Calculate months between dates
  const monthsDiff = Math.max(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30),
    1
  );
  const prsPerMonth = totalPRs / monthsDiff;

  return {
    totalPRs,
    mergedPRs,
    closedPRs,
    openPRs,
    mergeRate: Math.round(mergeRate * 10) / 10,
    prsPerMonth: Math.round(prsPerMonth * 10) / 10,
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
}

/**
 * Compare current and previous PR rates
 */
export function comparePRPeriods(
  currentStats: PRStats,
  previousStats: PRStats
): PRComparison {
  const rateChange = currentStats.prsPerMonth - previousStats.prsPerMonth;
  const rateChangePercent = previousStats.prsPerMonth > 0
    ? (rateChange / previousStats.prsPerMonth) * 100
    : 0;

  return {
    current: currentStats,
    previous: previousStats,
    rateChange: Math.round(rateChange * 10) / 10,
    rateChangePercent: Math.round(rateChangePercent * 10) / 10
  };
}

/**
 * Get comprehensive PR analysis for a user
 */
export async function getUserPRAnalysis(
  username: string,
  token: string
): Promise<PRComparison> {
  const now = new Date();

  // Current period: last 6 months
  const currentStart = new Date(now);
  currentStart.setMonth(currentStart.getMonth() - 6);

  // Previous period: 6-12 months ago
  const previousStart = new Date(now);
  previousStart.setMonth(previousStart.getMonth() - 12);
  const previousEnd = new Date(currentStart);

  // Fetch PRs for both periods
  const [currentPRs, previousPRs] = await Promise.all([
    fetchUserPullRequests(username, token, currentStart, now),
    fetchUserPullRequests(username, token, previousStart, previousEnd)
  ]);

  // Calculate stats
  const currentStats = calculatePRStats(currentPRs, currentStart, now);
  const previousStats = calculatePRStats(previousPRs, previousStart, previousEnd);

  // Compare periods
  return comparePRPeriods(currentStats, previousStats);
}
