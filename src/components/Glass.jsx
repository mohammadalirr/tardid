import Link from "next/link";
import { e2p } from "~/utils/common";
const Glass = () => {
  return (
    <>
      <div className="container glass-container">
        <div className="row glass-row">
          <div className="col col-xxl-8 col-xl-7 col-lg-7 col-md-9 col-sm-12 col-12 glass">
            <div className="img">
              <div className="menu-mobile">
                <div className="tardid-typo"></div>
                <div className="tardid-sub-typo"></div>
                <Link className="ticket menu-item" href="./TicketPage">
                  <div type="button">تهیه بلیت نمایش</div>
                </Link>
                <Link className="gallery menu-item" href="./Gallery">
                  <div type="button">گالری تصاویر</div>
                </Link>
                {/* <Link className="Pardakt menu-item" href="./PardakhtPage">
                  <div type="button">حمایت مالی</div>
                </Link> */}
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
              <div className="footer-item address">
                <h2>نشانی</h2>
                <p
                  style={{
                    direction: "rtl",
                    fontSize: "14px",
                    textAlign: "center",
                    padding: "10px",
                    lineHeight: "1.5em",
                  }}
                >
                  خیابان شریعتی، نرسیده به پل سید خندان، بوستان شهید منفرد نیاکی
                  (اندیشه)
                </p>
                <a
                  // href="geo:35.738470,51.444944?q=35.738470,51.444944(San Francisco)&z=15"
                  href="https://maps.app.goo.gl/pyqYe3iSivYP79v97"
                  target="blank"
                  style={{
                    marginTop: "2em",
                    fontSize: "16px",
                    backgroundColor: "black",
                    padding: ".4em .8em",
                    borderRadius: "1em",
                  }}
                >
                  مسیریابی
                </a>
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
            <div className="poshtibani">
              <span style={{ marginTop: "1em", marginBottom: "1em" }}>
                <a
                  style={{ textDecoration: "underline", fontSize: "16px" }}
                  href="tel:+989336683232"
                >
                  {e2p("09336683232")}
                </a>

                <span style={{ fontSize: "14px", marginLeft: ".5em" }}>
                  {" "}
                  : پشتیبانی{" "}
                </span>
              </span>
              <div style={{marginTop: '1em'}} dangerouslySetInnerHTML={{__html: `<a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=427342&Code=pSuCrmccRXMOjElR46ua02RemoTbMMeT'><img referrerpolicy='origin' style="height: 150px; width: 120px; border-radius: 10px" src='https://trustseal.enamad.ir/logo.aspx?id=427342&Code=pSuCrmccRXMOjElR46ua02RemoTbMMeT' alt='' style='cursor:pointer' Code='pSuCrmccRXMOjElR46ua02RemoTbMMeT'></a>`}} />

            </div>
            <div className="footer-logo">
              <span className="mesbah-logo"></span>
              <p>
                {" "}
                کاری از گروه فرهنگی و هنری{" "}
                <span
                  style={{
                    fontFamily: "Yekan",
                    fontSize: "21px",
                    color: "#2F6B75",
                    fontWeight: "bolder",
                    paddingRight: ".2em",
                  }}
                >
                  مصباح
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Glass;
