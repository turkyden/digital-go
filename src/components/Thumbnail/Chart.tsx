import Thumbnails, { Thumbnail } from '@antv/thumbnails';
import styles from './Chart.less';

const chartTypeList = Object.keys(Thumbnails);

export default function () {
  const liItem = chartTypeList.map((item) => {
    const { id, name } = Thumbnails[item];

    return (
      <div className="w-full p-2" key={id}>
        <div className="rounded-md hover:bg-green-500 hover:bg-opacity-10">
          <div className="px-2 py-1">
            <span className="text-xs text-center text-gray-400 ">{name}</span>
          </div>
          <div className={`text-center ${styles['thumbnail-chart']}`}>
            <Thumbnail chart={id} />
          </div>
        </div>
      </div>
    );
  });

  return <div className="flex flex-wrap">{liItem}</div>;
}
