import React from 'react';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import screenshot from '@/assets/template_1.png';

const Template: React.FC = () => {
  return (
    <section className="text-gray-400 body-font">
      <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div
            className="xl:w-1/4 lg:w-1/3 sm:w-1/2 p-4 shadow"
            onClick={() => (window.location.href = '/editor')}
          >
            <div className="flex flex-col justify-center items-center h-full w-full bg-gray-900 border-2 border-gray-800 border-dashed cursor-pointer">
              <span className="text-6xl font-thin">+</span>
            </div>
          </div>
          {Array.from(new Array(8), (v, k) => (
            <div key={k} className="xl:w-1/4 lg:w-1/3 sm:w-1/2 p-4 shadow">
              <div className="flex relative">
                <img
                  alt="gallery"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  src={screenshot}
                />
                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-90">
                  <h2 className="tracking-widest text-sm title-font font-medium text-indigo-400 mb-1">
                    THE SUBTITLE
                  </h2>
                  <h1 className="title-font text-lg font-medium text-white mb-3">
                    同济大学图书馆数字大屏
                  </h1>
                  <p className="leading-relaxed">
                    该项目用于呈现同济大学图书馆资源使用情况与运营可视化分析
                  </p>
                  <div className="flex justify-end">
                    <EditOutlined
                      className="rounded-full border border-solid border-gray-500 p-2 cursor-pointer"
                      onClick={() => (window.location.href = '/editor')}
                    />
                    <span className="px-2"></span>
                    <EyeOutlined className="rounded-full border border-solid border-gray-500 p-2 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Template;
