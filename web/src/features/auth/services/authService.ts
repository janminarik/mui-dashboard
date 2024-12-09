export const authService = {
    login: (username: string, password: string) => {
        if (username === "demo@demo.sk" && password === "nbu123") {
            return "test-token";
        }
        else {
            return null;
        }
    }
}
