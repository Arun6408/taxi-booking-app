import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-gray-200 w-screen h-screen p-2 flex items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 w-24 md:w-48 aspect-square rounded-full bg-[radial-gradient(circle,_#aeaeae,#d5d5d5)] translate-x-[18rem] shadow-2xl translate-y-2/3 backdrop-blur-lg transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-0"></div>
        <div className="absolute inset-0 w-24 md:w-48 aspect-square rounded-full bg-[radial-gradient(circle,_#da4cd5,#d76ad478)] translate-x-[18rem] shadow-2xl translate-y-2/3 backdrop-blur-lg transition-opacity duration-500 ease-in-out opacity-0 hover:opacity-100"></div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 w-36 md:w-48 aspect-square rounded-full bg-[radial-gradient(circle,_#ffffff,#dbdbdb)] -translate-x-1/2 shadow-2xl -translate-y-[14rem] backdrop-blur-lg transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-0"></div>
        <div className="absolute inset-0 w-36 md:w-48 aspect-square rounded-full bg-[radial-gradient(circle,_#a44cda,#906ad778)] -translate-x-1/2 shadow-2xl -translate-y-[14rem] backdrop-blur-lg transition-opacity duration-500 ease-in-out opacity-0 hover:opacity-100"></div>
      </div>

      <SignIn forceRedirectUrl={'/'}/>
    </div>
  );
}
