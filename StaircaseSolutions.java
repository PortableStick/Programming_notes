class StairProblems {
	public static int recursiveSolution(int s) {
		if(s < 0) {
			return 0;
		}
		if(s == 0) {
			return 1;
		}
		return recursiveSolution(s - 1) + recursiveSolution(s - 2) + recursiveSolution(s - 3);
	}

	public static int memoizationSolution(int s) {
		//wrapper function to simplify API
		return memoizationSolution(s, new int[s + 1]);
	}

	public static int memoizationSolution(int s, int[] memo) {
		if(s < 0) {
			return 0;
		}
		if(s == 0) {
			return 1;
		}
		if(memo[s] == 0) {
			memo[s] = memoizationSolution(s - 1, memo) + memoizationSolution(s - 2, memo) + memoizationSolution(s - 3, memo); 
		}
		return memo[s];
	}

	public static int dpSolution(int s) {
		if(s < 0) {
			return 0;
		}
		if(s <= 1) {
			return 1;
		}
		int[] = new int[s + 1];
		paths[0] = 1;
		paths[1] = 1;
		paths[2] = 2;
		for(int i = 3; i <= s; i++) {
			paths[i] = paths[i - 1] + paths[i - 2] + paths[i - 3];
		}
		return paths[s];
	}

	public static int iterativeSolution(int s) {
		if(s < 0) {
			return 0;
		}
		if(s <= 1) {
			return 1;
		}
		int[] paths = {1, 1, 2};
		for(int i = 3; i <= steps; i++) {
			int count = paths[2] + paths[1] + paths[0];
			paths[0] = paths[1];
			paths[1] = paths[2];
			paths[2] = count;
		}
		return paths[2];
	}
}