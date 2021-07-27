import onClickOutside from "react-onclickoutside";
import { useSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";

const LoginPop = ({ setShowPop }) => {
  const [session, loading] = useSession();
  const router = useRouter();

  LoginPop.handleClickOutside = (event) => {
    setShowPop(false);
  };

  const authenticate = async () => {
    if (!session) {
      router.push("/signin");
    } else {
      signOut({ callbackUrl: "https://amazon-clone-200.herokuapp.com" });
    }
  };
  return (
    <div className="absolute top-12 w-38 h-2/3 flex flex-col justify-center p-4 bg-white">
      <button
        className="button text-gray-800 text-xs font-semibold grid place-content-center"
        onClick={authenticate}
      >
        {!session ? "Sign in" : "Logout"}
      </button>
      {!session && (
        <p className="text-gray-600 text-xs">
          New customer?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline hover:text-yellow-500"
            onClick={() => router.push("/signup")}
          >
            Start here
          </span>
        </p>
      )}
    </div>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => LoginPop.handleClickOutside,
};

export default onClickOutside(LoginPop, clickOutsideConfig);
