export default function LoginPage() {
  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col justify-center items-center">
      <section className="w-full text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-5xl text-white">
              LowCode 低代码数字化大屏
            </h1>
            <p className="leading-relaxed text-2xl mt-4">
              专注于企业数字化和降低数字化成本的解决方案
            </p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-white text-lg font-medium title-font mb-5">
              新用户注册 / 登陆
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="full-name"
                className="leading-7 text-sm text-gray-400"
              >
                用户名
              </label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-blue-900 rounded border border-gray-600 focus:border-blue-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-400"
              >
                密码
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-blue-900 rounded border border-gray-600 focus:border-blue-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg cursor-pointer"
              onClick={() =>
                (window.location.href =
                  'https://github.com/Turkyden/digital-go')
              }
            >
              快速开始
            </button>
            <p className="text-xs mt-3">
              忘记密码？Tips: 密码不能小于 8 位，且由数字和大小写字母组成。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
