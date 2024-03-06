/// <reference types="@types/google.maps" />
import { useEffect, useRef } from "react";
import "./App.css";
import { Company, User } from "./classes";
import { CustomMap } from "./classes/Map";

function App() {
  const refMap = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!refMap.current) return;

    const user = new User();
    const company = new Company();

    const map = new CustomMap(refMap.current);
    map.addMarker(user);
    map.addMarker(company);
  }, []);

  return (
    <div>
      Map App
      <div ref={refMap}></div>
    </div>
  );
}

export default App;
