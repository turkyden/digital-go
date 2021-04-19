import { useSpring, animated } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import {
  PlusOutlined,
  MinusOutlined,
  InsertRowBelowOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

export default function Scaler({
  onZoomUp,
  onZoomDown,
  onReset,
}: {
  onZoomUp: () => void;
  onZoomDown: () => void;
  onReset: () => void;
}) {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(
    ({ down, offset: [ox, oy] }) =>
      api.start({ x: ox, y: oy, immediate: down }),
    {
      bounds: { left: -1200, right: 60, top: -600, bottom: 60 },
      rubberband: true,
    },
  );

  return (
    <>
      <animated.div
        className="absolute bottom-24 right-24 shadow-lg rounded flex bg-gray-800"
        style={{ x, y }}
      >
        <div
          className="px-2 py-2 select-none flex flex-col justify-center items-center"
          style={{ cursor: 'grab' }}
          {...bind()}
        >
          <svg
            className="octicon octicon-grabber"
            fill="#fff"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 13a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zM6 5a1 1 0 100-2 1 1 0 000 2z"
            ></path>
          </svg>
        </div>
        <div className="px-2 py-2 hover:text-blue-500">
          <PlusOutlined onClick={onZoomUp} />
        </div>
        <div className="px-2 py-2 hover:text-blue-500">
          <MinusOutlined onClick={onZoomDown} />
        </div>
        <div className="px-2 py-2 hover:text-blue-500">
          <ReloadOutlined onClick={onReset} />
        </div>
        <div className="px-4 py-2 hover:text-blue-500">
          <InsertRowBelowOutlined />
        </div>
      </animated.div>
    </>
  );
}
