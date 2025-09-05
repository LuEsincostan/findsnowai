import logoDark from "./finsnowai_dark_txt.svg";
import logoLight from "./finsnowai_light_txt.svg";

export function Welcome({ message }: { message: string }) {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-4 min-h-0">
        <header className="flex flex-col items-center gap-4">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={logoLight}
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src={logoDark}
              alt="React Router"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <div className="max-w-[500px] w-full space-y-2 px-2">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4 bg-white/70 dark:bg-gray-900/70 shadow-lg">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center font-semibold text-lg">
              Coming Soon!
            </p>
            <p className="text-gray-600 dark:text-white text-center mb-4">
              You love long days on nordic skis? You are excited about trying out new tracks? We have just the right challenge for you
              this winter.
              Sign up below to get notified when we launch.
            </p>
            <form className="flex flex-col gap-2 items-center">
              <input
                type="email"
                placeholder="Your email address"
                className="border border-gray-300 rounded px-3 py-2 w-full bg-white/80 dark:bg-gray-800/80"
                disabled
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed"
                disabled
              >
                Sign Up (Coming Soon)
              </button>
            </form>
            <ul>
              <li className="self-stretch p-3 leading-normal">{message}</li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}
