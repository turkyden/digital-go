import { useSpring, animated } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import {
  PlusOutlined,
  MinusOutlined,
  InsertRowBelowOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

export default function Scaler() {
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
        {...bind()}
        style={{ x, y, cursor: 'grab' }}
      >
        <div className="px-4 py-2">:::</div>
        <div className="px-4 py-2">
          <PlusOutlined />
        </div>
        <div className="px-4 py-2">
          <MinusOutlined />
        </div>
        <div className="px-4 py-2">
          <InsertRowBelowOutlined />
        </div>
        <div className="px-4 py-2">
          <ReloadOutlined />
        </div>
      </animated.div>
    </>
  );
}
