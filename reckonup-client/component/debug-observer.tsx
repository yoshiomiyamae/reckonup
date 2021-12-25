import { useEffect } from "react";
import { useRecoilSnapshot } from "recoil";

export const DebugObserver = () => {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug('The following atoms were modified:');
    const nodes = snapshot.getNodes_UNSTABLE({ isModified: true });
    const keys = Object.keys(nodes);
    keys.forEach(k => console.debug(k, snapshot.getLoadable(nodes[k])))
  }, [snapshot]);

  return null;
}

export default DebugObserver;