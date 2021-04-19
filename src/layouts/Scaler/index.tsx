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
          className="px-4 py-2 select-none flex flex-col justify-center items-center"
          style={{ cursor: 'grab' }}
          {...bind()}
        >
          <i className="not-italic tracking-widest">:::</i>
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
