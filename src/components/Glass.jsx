import Link from "next/link";
const Glass = () => {
  return (
    <>
      <div className="container glass-container">
        <div className="row glass-row">
          <div className="col col-xxl-8 col-xl-7 col-lg-7 col-md-9 col-sm-12 col-12 glass">
            <div className="img">
              <div className="menu-mobile">
                <div className="tardid-typo"></div>
                <Link className="gallery menu-item" href="./Gallery">
                  <div type="button">گالری تصاویر</div>
                </Link>

                {/* <Link
                  className="ticket menu-item"
                  href="./TicketPage"
                  style={{
                    background: "rgba(0, 0, 0, 0.8)",
                    color: "#ffffff38",
                  }}
                > */}
                <div
                  className="ticket menu-item"
                  style={{
                    background: "rgba(0, 0, 0, 0.8)",
                    color: "#ffffff38",
                  }}
                >
                  <div type="button">تهیه بلیت نمایش</div>
                </div>
                {/* <Link
                  className="Pardakt menu-item"
                  href="./PardakhtPage"
                  style={{
                    background: "rgba(0, 0, 0, 0.8)",
                    color: "#ffffff38",
                  }}
                > */}
                <div
                  className="ticket menu-item"
                  style={{
                    background: "rgba(0, 0, 0, 0.8)",
                    color: "#ffffff38",
                  }}
                >
                  <div type="button">حمایت مالی</div>
                </div>
                {/* </Link> */}
              </div>
            </div>
            {/* <div className="menu">
              <Link className="gallery menu-item" href="./Gallery">
                <div type="button">گالری تصاویر</div>
              </Link>

              <Link className="ticket menu-item" href="./TicketPage">
                <button type="button">تهیه بلیت نمایش</button>
              </Link>
              <Link className="Pardakt menu-item" href="./PardakhtPage">
                <div type="button">حمایت مالی</div>
              </Link>
            </div> */}
            <div className="footer">
              <div className="footer-item poshtibani">
                <h2>پشتیبانی</h2>
                <span>
                  <i
                    class="fa-solid fa-circle-user fa-lg"
                    style={{ margin: "1em .5em 0 0" }}
                  ></i>
                  <a
                    style={{ textDecoration: "underline", fontSize: "15px" }}
                    href="tel:+989336683232"
                  >
                    09336683232
                  </a>
                </span>
              </div>
              <div className="footer-item tamas">
                <h2>ارتباط با ما</h2>
                <a
                  href="https://t.me/mesbah_artgroup"
                  target="blank"
                  className="icon-container"
                >
                  <span className="icon tel-icon"></span>
                  <span>تلگرام</span>
                </a>

                <a
                  href="https://ble.ir/join/DwV18GhH6g"
                  target="blank"
                  className="icon-container"
                >
                  <span className="icon bale-icon"></span>
                  <span>بله</span>
                </a>
                <a
                  href="https://instagram.com/mesbah_artgroup?igshid=M2RkZGJiMzhjOQ=="
                  target="blank"
                  className="icon-container"
                >
                  <span className="icon insta-icon"></span>
                  <span>اینستاگرام</span>
                </a>
              </div>
            </div>
            <div className="footer-logo">
              <span className="mesbah-logo"></span>
              <p> کاری از گروه فرهنگی و هنری <span style={{fontFamily:'Yekan', fontSize:'21px' , color:'#2F6B75' , fontWeight:'bolder' , paddingRight:'.2em'}}>مصباح</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Glass;
