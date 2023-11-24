import { useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ActionIcon } from "@mantine/core";
import Link from "next/link";

const PardakhtPage = () => {
  const [amount, setAmount] = useState(0);
  console.log(amount);

  const handleAmount = (price) => {
    const finalCount = amount + price;
    setAmount(finalCount);
  };

  const handleInputChange = (event) => {
    const isNumber = parseInt(event.target.value, 10) || 0;
    if (!isNaN(isNumber)) {
      setAmount(isNumber);
    }
  };
  return (
    <>
        <div className="container-p ">
          <div className="row row-p">
            <div className="box-container-p col-xxl-4 col-xl-4 col-lg-5 col-md-6 col-sm-11 col-11">
              <div style={{ position: "fixed", top: ".5em", left: ".5em" }}>
                <Link href="/">
                  <ActionIcon variant="filled">
                    <ArrowBackIcon />
                  </ActionIcon>
                </Link>
              </div>

              <div className="internal-box row">
                <div
                  className=" col-p col col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-9 col-10"
                  style={{ padding: "0" }}
                >
                  <div className="box-typo-p">
                    <span className="typo-p">ممنون از حمایت شما</span>
                  </div>
                  <form className="form-p">
                    <div className="input-group">
                      <span
                        type="button"
                        className="input-group-text"
                        id="p"
                        onClick={() => setAmount(0)}
                      >
                        <RefreshIcon />
                      </span>

                      <input
                        type="number"
                        className="form-control"
                        placeholder="مبلغ را وارد کنید ..."
                        aria-describedby="p"
                        style={{ fontFamily: "Yekan" }}
                        value={amount}
                        disabled
                      />
                      <span className="input-group-text" id="p">
                        تومان
                      </span>
                    </div>

                    <div className="chips-box">
                      <div className="internal-row-p">
                        <div
                          type="button"
                          onClick={() => handleAmount(10000)}
                          className="chip-p"
                        >
                          10,000+
                        </div>
                        <div
                          type="button"
                          onClick={() => handleAmount(20000)}
                          className="chip-p"
                        >
                          20,000+
                        </div>
                        <div
                          type="button"
                          onClick={() => handleAmount(50000)}
                          className="chip-p"
                        >
                          50,000+
                        </div>
                      </div>
                      <div className="internal-row-p">
                        <div
                          type="button"
                          onClick={() => handleAmount(100000)}
                          className="chip-p"
                        >
                          100,000+
                        </div>
                        <div
                          type="button"
                          onClick={() => handleAmount(200000)}
                          className="chip-p"
                        >
                          200,000+
                        </div>
                        <div
                          type="button"
                          onClick={() => handleAmount(500000)}
                          className="chip-p"
                        >
                          500,000+
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-danger btn-p"
                      style={{ position: "relative", top: "1.5em" }}
                    >
                      پرداخت
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default PardakhtPage;
