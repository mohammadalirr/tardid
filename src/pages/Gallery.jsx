import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ActionIcon } from "@mantine/core";
import Link from "next/link";
import {
  dataImagesI,
  dataImagesII,
  dataImagesIII,
  dataImagesIIII,
} from "../data/images";
import ParticlesContainer from "~/components/FireParticle";

const MainGallery = () => {
  return (
    <>
      {/* <ParticlesContainer /> */}

      <div className="scroll-space">
        <div className="navbar-parent">
          <div className="sticky-nav">
            <div className="nav-item block">{"  "}</div>
            <div className="nav-item nav-title">
              <h2 style={{ fontSize: "25px" }}>نگارخانه</h2>
            </div>
            <div className="nav-item back">
              <Link href="/">
                <ActionIcon variant="filled">
                  <ArrowBackIcon />
                </ActionIcon>
              </Link>
            </div>
          </div>
        </div>

        <div className="box-g">
          <div className="container-g">
            <div className="row row-g">
              <div className="col col-3 column-g">
                {dataImagesI.map((image, index) => (
                  <a
                    href={`http://mesbahtheater.ir/static/hadis-images/main/${image.title}.jpg`}
                    target="blank"
                  >
                    <img
                      className="img-g"
                      key={index}
                      src={image.img}
                      alt={image.title}
                    />
                  </a>
                ))}
              </div>
              <div className="col col-3 column-g">
                {dataImagesII.map((image, index) => (
                  <a
                    href={`http://mesbahtheater.ir/static/hadis-images/main/${image.title}.jpg`}
                    target="blank"
                  >
                    <img
                      className="img-g"
                      key={index}
                      src={image.img}
                      alt={image.title}
                    />
                  </a>
                ))}
              </div>
              <div className="col col-3 column-g">
                {dataImagesIII.map((image, index) => (
                  <a
                    href={`http://mesbahtheater.ir/static/hadis-images/main/${image.title}.jpg`}
                    target="blank"
                  >
                    <img
                      className="img-g"
                      key={index}
                      src={image.img}
                      alt={image.title}
                    />
                  </a>
                ))}
              </div>
              <div className="col col-3 column-g">
                {dataImagesIIII.map((image, index) => (
                  <a
                    href={`http://mesbahtheater.ir/static/hadis-images/main/${image.title}.jpg`}
                    target="blank"
                  >
                    <img
                      className="img-g"
                      key={index}
                      src={image.img}
                      alt={image.title}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainGallery;
