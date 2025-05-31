// components/ModelViewer.js
import "@google/model-viewer";
import Link from "next/link";

const ModelViewer = () => {
  return (
    <div className="relative w-full h-screen bg-gray-300 overflow-hidden">
      <h1 className="text-6xl md:text-8xl lg:text-9xl mt-20 md:mt-3 whitespace-normal break-words top-[15px] md:top-[100px] text-gray opacity-50   text-center  tracking-wider   leading-tight z-1 flex justify-center items-center absolute">
        INDUCTION PROGRAM
      </h1>
      {/* Base plane */}
      <div
        className="absolute inset-0 bg-gradient-to-b to-[#d25c25] from-gray-300"
        style={{
          transform: "rotateX(60deg) translateZ(-20px)",
          perspectiveOrigin: "center center",
          perspective: "1000px",
          height: "200vh",
          width: "100vw",
          zIndex: 1,
        }}
      />
      <Link href="/induction">
        <h4 className="text-center z-50 text-2xl opacity-20 hover:opacity-100 cursor-pointer transition-opacity duration-300 absolute bottom-10 left-1/2 transform -translate-x-1/2">
          Choose your best role, and apply for Induction.
        </h4>
      </Link>

      {/* Model viewer positioned above the plane */}
      <div className="relative z-10 flex justify-between items-center h-screen">
        <model-viewer
          src="TeamManager.glb"
          ar
          ar-modes="webxr scene-viewer quick-look"
          min-camera-orbit="auto auto 5%"
          max-camera-orbit="auto auto 90%"
          camera-target="0m 1m 0m"
          tone-mapping="neutral"
          poster="poster.webp"
          shadow-intensity="0.81"
          autoplay
          shadow-softness="0.82"
          environment-image="neutral"
          exposure="1.0"
          ambient-light-intensity="1.5"
          direct-light-intensity="2.5"
          stage-light-intensity="2"
          style={{
            width: "35%",
            height: "60vh",
            position: "absolute",
            left: "-5%",
            top: "50%",
            transform: "translateY(-50%)",
            "--model-color": "#000",
          }}
        >
          <button
            className="Hotspot"
            slot="hotspot-1"
            data-surface="0 0 3386 3240 839 0.085 0.677 0.238"
            data-visibility-attribute="visible"
          >
            <div className="HotspotAnnotation">Graphic Designer</div>
          </button>
          <div className="progress-bar hide" slot="progress-bar">
            <div className="update-bar"></div>
          </div>
          
        </model-viewer>

        <model-viewer
          src="Talking On A Cell Phone.glb"
          ar
          ar-modes="webxr scene-viewer quick-look"
          tone-mapping="neutral"
          poster="poster.webp"
          shadow-intensity="1"
          autoplay
          camera-target="0m 1m 0m"
          camera-orbit="0deg 90deg auto"
          min-camera-orbit="auto 90deg auto"
          max-camera-orbit="auto 90deg auto"
          style={{
            width: "33%",
            height: "60vh",
            position: "absolute",
            left: "66%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <button
            className="Hotspot"
            slot="hotspot-2"
            data-surface="0 0 8177 3241 3242 0.079 0.854 0.067"
            data-visibility-attribute="visible"
          >
            <div className="HotspotAnnotation">Content Writer</div>
          </button>
          <div className="progress-bar hide" slot="progress-bar">
            <div className="update-bar"></div>
          </div>
          
          <div id="ar-prompt">
            {/* <img src="https://modelviewer.dev/shared-assets/icons/hand.png"> */}
          </div>
        </model-viewer>

        {/* <model-viewer
                src="Video.glb"
                ar
                ar-modes="webxr scene-viewer quick-look"
                
                tone-mapping="neutral"
                poster="poster.webp"
                shadow-intensity="1"
                autoplay
                camera-target="0m 1m 0m"
                camera-orbit="0deg 90deg auto" 
                min-camera-orbit="auto 90deg auto"
                max-camera-orbit="auto 90deg auto"
                style={{
                    width: "33%",
                    height: "80vh",
                    position: "absolute",
                    left: "33%",
                    top: "50%",
                    transform: "translateY(-50%)",
                }}
            >
                <button
                    className="Hotspot"
                    slot="hotspot-2"
                    data-surface="0 0 10753 3243 3241 0.097 0.073 0.830"
                    data-visibility-attribute="visible"
                >
                    <div className="HotspotAnnotation">Team Leader</div>
                </button>
                <div className="progress-bar hide" slot="progress-bar">
                    <div className="update-bar"></div>
                </div>
                <button slot="ar-button" id="ar-button">
                    View in your space
                </button>
                
            </model-viewer> */}

        <model-viewer
          src="ComputerDesk.glb"
          style={{
            left: "27%",
            top: "40%",
            transform: "translateY(-50%)",
            width: "50%",
            height: "50vh",
          }}
          camera-target="0m 1.5m 3m"
          ar
          ar-modes="webxr scene-viewer quick-look"
          tone-mapping="neutral"
          poster="poster.webp"
          shadow-intensity="1"
          autoplay
          camera-orbit="-49.36deg 76.86deg 16.2m"
          field-of-view="30deg"
        >
          <button
            className="Hotspot"
            slot="hotspot-1"
            data-surface="6 0 1556 6414 1520 0.578 0.057 0.365"
            data-visibility-attribute="visible"
          >
            <div className="HotspotAnnotation">
              Web <br /> Developer
            </div>
          </button>
          <div className="progress-bar hide" slot="progress-bar">
            <div className="update-bar"></div>
          </div>
          {/* <button slot="ar-button" id="ar-button">
        View in your space
    </button> */}
          <div id="ar-prompt">
            {/* <img src="https://modelviewer.dev/shared-assets/icons/hand.png"> */}
          </div>
        </model-viewer>

        <model-viewer
          src="ContentWriter.glb"
          ar
          ar-modes="webxr scene-viewer quick-look"
          tone-mapping="neutral"
          poster="poster.webp"
          shadow-intensity="1"
          autoplay
          camera-orbit="0deg 90deg auto"
          min-camera-orbit="auto 90deg auto"
          max-camera-orbit="auto 90deg auto"
          style={{
            left: "-25%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "33%",
            height: "100vh",
          }}
          camera-target="0m 1m 1m"
        >
          <button
            className="Hotspot"
            slot="hotspot-1"
            data-surface="0 0 3386 3240 839 0.073 0.743 0.184"
            data-visibility-attribute="visible"
          >
            <div className="HotspotAnnotation">
              Video <br /> Editor
            </div>
          </button>
          <div className="progress-bar hide" slot="progress-bar">
            <div className="update-bar"></div>
          </div>
          
          <div id="ar-prompt">
            {/* <img src="https://modelviewer.dev/shared-assets/icons/hand.png"> */}
          </div>
        </model-viewer>

        <model-viewer
          src="Standing Idle.glb"
          camera-orbit="0deg 90deg auto"
          min-camera-orbit="auto 90deg auto"
          max-camera-orbit="auto 90deg auto"
          style={{
            right: "15%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "33%",
            height: "100vh",
          }}
          camera-target="0m 1m 1m"
          ar
          ar-modes="webxr scene-viewer quick-look"
          tone-mapping="neutral"
          poster="poster.webp"
          shadow-intensity="1"
          autoplay
        >
          <button
            className="Hotspot"
            slot="hotspot-1"
            data-surface="0 0 8174 3240 3241 0.003 0.861 0.135"
            data-visibility-attribute="visible"
          >
            <div className="HotspotAnnotation">Artist</div>
          </button>
          <div className="progress-bar hide" slot="progress-bar">
            <div className="update-bar"></div>
          </div>
          
          <div id="ar-prompt">
            {/* <img src="https://modelviewer.dev/shared-assets/icons/hand.png"> */}
          </div>
        </model-viewer>
      </div>
      <div className="flex align-items-center absolute z-10 justify-content-center"></div>
    </div>
  );
};

export default ModelViewer;