import { LoadingOutlined } from '@ant-design/icons';
import './Loading.scss';

interface IProps {
  className?: string;
  fontSize?: number;
}

function Loading(props: IProps) {
  return (
    <div id="loading" className={props.className}>
      <LoadingOutlined
        className="icon"
        style={{ fontSize: `${props.fontSize ?? 24}px` }}
      />
    </div>
  );
}

export default Loading;
