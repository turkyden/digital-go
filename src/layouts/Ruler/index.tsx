import { useEffect, useRef } from 'react';
import ruler from './ruler';
import './ruler.css';

export default function ReactRuler() {
  const ref = useRef(null);

  useEffect(() => {
    const myRuler = new ruler({
      container: ref.current, // reference to DOM element to apply rulers on
      rulerHeight: 15, // thickness of ruler
      fontFamily: 'arial', // font for points
      fontSize: '7px',
      strokeStyle: 'black',
      lineWidth: 1,
      enableMouseTracking: true,
      enableToolTip: true,
      strokeStyle: '#6B7280',
      fillStyle: '#E5E7EB',
    });
  }, []);

  return (
    <>
      <div
        id="stage"
        className="relative w-full h-full"
        style={{}}
        ref={ref}
      ></div>
    </>
  );
}
