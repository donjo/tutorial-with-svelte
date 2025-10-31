import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getUserPRAnalysis } from '$lib/github';

export const GET: RequestHandler = async ({ url }) => {
  const username = url.searchParams.get('username');
  const token = url.searchParams.get('token');

  if (!username) {
    throw error(400, 'Username is required');
  }

  if (!token) {
    throw error(400, 'GitHub token is required');
  }

  try {
    const analysis = await getUserPRAnalysis(username, token);
    return json(analysis);
  } catch (err) {
    console.error('Error fetching GitHub stats:', err);
    throw error(500, err instanceof Error ? err.message : 'Failed to fetch GitHub stats');
  }
};
