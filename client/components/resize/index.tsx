import Image from "next/image";
import React, { useRef, useEffect, FC } from "react";
import { MdOutlineClear } from "react-icons/md";
import { GoArrowBoth } from "react-icons/go";

interface ResizeProps {
  media: string;
  handleMediaClear: () => void;
  isSketch?: boolean;
}

const Resize: FC<ResizeProps> = ({ media, handleMediaClear, isSketch }) => {
  const ref = useRef<any>(null);
  const refLeft = useRef<any>(null);
  const refTop = useRef<any>(null);
  const refRight = useRef<any>(null);
  const refBottom = useRef<any>(null);

  useEffect(() => {
    const resizeableEle = ref.current;
    const styles = window.getComputedStyle(resizeableEle);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0;
    let y = 0;

    resizeableEle.style.top = "50px";
    resizeableEle.style.left = "50px";

    // Right resize
    const onMouseMoveRightResize = (event: any) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;
      resizeableEle.style.width = `${width}px`;
    };

    const onMouseUpRightResize = (event: any) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event: any) => {
      x = event.clientX;
      resizeableEle.style.left = styles.left;
      resizeableEle.style.right = null;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    // Top resize
    const onMouseMoveTopResize = (event: any) => {
      const dy = event.clientY - y;
      height = height - dy;
      y = event.clientY;
      resizeableEle.style.height = `${height}px`;
    };

    const onMouseUpTopResize = (event: any) => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (event: any) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.bottom = styles.bottom;
      resizeableEle.style.top = null;
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };

    // Bottom resize
    const onMouseMoveBottomResize = (event: any) => {
      const dy = event.clientY - y;
      height = height + dy;
      y = event.clientY;
      resizeableEle.style.height = `${height}px`;
    };

    const onMouseUpBottomResize = (event: any) => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (event: any) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.top = styles.top;
      resizeableEle.style.bottom = null;
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };

    // Left resize
    const onMouseMoveLeftResize = (event: any) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width - dx;
      resizeableEle.style.width = `${width}px`;
    };

    const onMouseUpLeftResize = (event: any) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };

    const onMouseDownLeftResize = (event: any) => {
      x = event.clientX;
      resizeableEle.style.right = styles.right;
      resizeableEle.style.left = null;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };

    // Add mouse down event listener
    const resizerRight = refRight.current;
    resizerRight.addEventListener("mousedown", onMouseDownRightResize);
    const resizerTop = refTop.current;
    resizerTop.addEventListener("mousedown", onMouseDownTopResize);
    const resizerBottom = refBottom.current;
    resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);
    const resizerLeft = refLeft.current;
    resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);

    return () => {
      resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
      resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
      resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
      resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
    };
  }, []);

  return (
    <div className="relative h-full w-full cursor-pointer">
      <div ref={ref} className={isSketch ? "resizeablesketch" : "resizeable"}>
        <div
          className="resizer left-0 top-0 z-50 cursor-pointer bg-red-700 rounded"
          onClick={handleMediaClear}
        >
          <MdOutlineClear />
        </div>
        <div
          ref={refLeft}
          className="resizer left-0 z-50 shadow-2xl cursor-ew-resize"
        >
          <GoArrowBoth className="text-white-700" />
        </div>
        <div
          ref={refTop}
          className="resizer top-0 z-50 shadow-2xl cursor-ns-resize"
        >
          <GoArrowBoth className="rotate-90 text-white-700" />
        </div>
        <div
          ref={refRight}
          className="resizer right-0 z-50 shadow-2xl cursor-ew-resize"
        >
          <GoArrowBoth className="text-white-700" />
        </div>
        <div
          ref={refBottom}
          className="resizer bottom-0 z-50 shadow-2xl cursor-ns-resize"
        >
          <GoArrowBoth className="rotate-90 text-white-700" />
        </div>
        <div className={`relative cursor-pointer h-full w-full`}>
          <Image src={media} fill alt="upload your media" sizes="100vw" />
        </div>
      </div>
    </div>
  );
};

export default Resize;
