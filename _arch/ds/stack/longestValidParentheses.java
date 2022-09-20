import java.util.*; 

public int longestValidParentheses(String s) {
    int ans = 0;

    Stack<Integer> stack = new Stack<>();
    stack.push(-1);

    for (int i = 0; i < s.length(); i++) {
        if (s.charAt(i) == '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.empty()) {
                stack.push(i);
            } else {
                ans = Math.max(ans, i - stack.peek());
            }
        }
    }
    return ans;
}

assert longestValidParentheses(")()())") == 4 
// The longest valid parentheses substring is "()()"