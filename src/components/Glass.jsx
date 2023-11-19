import Link from "next/link";
const Glass = () => {
  return (
    <>
      <div className="container glass-container">
        <div className="row glass-row">
          <div className="col col-xxl-8 col-xl-7 col-lg-7 col-md-9 col-sm-12 col-12 glass">
            <div className="img"></div>
            <div className="menu">
              <Link className="ticket menu-item" href="./TicketPage">
                <div type="button">تهیه بلیت نمایش</div>
              </Link>
              <Link className="gallery menu-item" href="./Gallery">
                <div type="button">گالری تصاویر</div>
              </Link>
              <Link className="Pardakt menu-item" href="./PardakhtPage">
                <div type="button">
                  حمایت مالی
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Glass;
