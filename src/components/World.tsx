import { Playground } from '../art';

export function World() {
  return (
    <div className="world" aria-hidden="true">
      <div className="sun">
        <span className="sun-eye left" />
        <span className="sun-eye right" />
        <span className="sun-smile" />
      </div>
      <div className="cloud cloud-a" />
      <div className="cloud cloud-b" />
      <div className="cloud cloud-c" />
      <Playground />
    </div>
  );
}
