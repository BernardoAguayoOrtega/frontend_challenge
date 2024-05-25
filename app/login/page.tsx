export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-20 bg-primary p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
      <form className="space-y-4">
        <div>
          <label
            className="block text-secondary text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full p-2 border border-secondary rounded bg-primary text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div>
          <label
            className="block text-secondary text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full p-2 border border-secondary rounded bg-primary text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-secondary text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
