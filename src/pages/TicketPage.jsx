import { useState, useCallback, useEffect, useRef } from "react";
import Ticket from "../components/Ticket";
import DaySelector from "../components/DaySelector";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ActionIcon, LoadingOverlay } from "@mantine/core";
import Link from "next/link";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";
import { e2p } from "../utils/common";
import { useMutation } from "@tanstack/react-query";
import BaseRepository from "~/data/repository/BaseRepository";

let TicketPage = () => {
  const [loading, setLoading] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [ticketData, setTicketData] = useState(
    Array(ticketCount).fill({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      gender: "",
      isLeader: true,
      event: "",
      relation: "",
      hasParking: "",
      ticketCount: "",
    })
  );
  const [firstNameA, setFirstNameA] = useState(false);
  const [lastNameA, setLastNameA] = useState(false);
  const [phoneA, setPhoneA] = useState(false);
  const [genderA, setGenderA] = useState(false);
  const [relationA, setRelationA] = useState(false);
  const [carA, setCarA] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [daySelect, setDaySelect] = useState(false);
  const [dayS, setDayS] = useState();

  const [selected, setSelected] = useState("");
  const [isCar, setIsCar] = useState("");

  const ticketStatus = useRef();

  const handleCount = useCallback((count) => {
    if (count <= 15 && count > 0) {
      const isNumber = Number(count);
      setTicketCount(isNumber);
    } else if (count > 15) {
      setTicketCount(15);
    } else {
      setTicketCount(0);
    }
  }, []);

  useEffect(() => {
    const newData = [...ticketData];
    newData[0] = { ...newData[0], day: dayS };
    setTicketData(newData);
    if (dayS) {
      setDaySelect(true);
    }
  }, [dayS, daySelect]);

  useEffect(() => {
    const newData = [...ticketData];
    newData[0] = { ...newData[0], hasParking: isCar };
    setTicketData(newData);
  }, [isCar]);

  useEffect(() => {
    const newData = [...ticketData];
    newData[0] = { ...newData[0], relation: selected };
    setTicketData(newData);
  }, [selected]);

  useEffect(() => {
    const newData = [...ticketData];
    newData[0] = { ...newData[0], ticketCount: ticketCount };
    setTicketData(newData);
  }, [ticketCount]);

  const handleFirstName = (index, value) => {
    const newData = [...ticketData];
    newData[index] = { ...newData[index], firstName: value };
    setTicketData(newData);
  };

  const handleLastName = (index, value) => {
    const newData = [...ticketData];
    newData[index] = { ...newData[index], lastName: value };
    setTicketData(newData);
  };

  const handlePhoneNumber = (index, value) => {
    const newData = [...ticketData];
    newData[index] = { ...newData[index], phoneNumber: value };

    setTicketData(newData);
  };

  const handleGender = (index, value) => {
    const newData = [...ticketData];
    newData[index] = { ...newData[index], gender: value };

    setTicketData(newData);
  };

  useEffect(() => {
    if (firstNameA && lastNameA && phoneA && relationA && carA) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [firstNameA, lastNameA, phoneA, relationA, carA]);

  useEffect(() => {
    console.log({ firstNameA, lastNameA, phoneA, relationA });
  }, [firstNameA, lastNameA, phoneA, relationA]);

  // const server_URL = "http://localhost:9000";
  // const submit = (ticketData) => {
  //   const url = `${server_URL}/tasks`;
  //   // axios.post(url, ticketData);
  // };

  const eventParticipantMutation = useMutation((data) =>
    new BaseRepository({ endpoint: "/eventParticipant/create" }).create(data)
  );
  const userMutation = useMutation((data) =>
    new BaseRepository({ endpoint: "/ty329djaa" }).create(data)
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(ticketData);
    setLoading(true)

    try {
      const data_ = ticketData.map((e) => ({
        ...e,
        mobile: e.phoneNumber,
        nationalCode: e.phoneNumber,
      }));
      const teamList = data_.filter((e) => !e.isLeader);
      const leader = data_.filter((e) => e.isLeader)[0];
      const team = await Promise.all(
        teamList.map(async (e) => {
          const userRes = await userMutation.mutateAsync({
            ...e,
            roles: ["foreign"],
          });
          console.log("userRes", userRes);
          const res = await eventParticipantMutation.mutateAsync({
            user: userRes?.data?.data?.id,
            event: leader.day,
            relation: leader.relation,
            hasParking: leader.hasParking === 'Yes' ? true : false,
          });
          console.log("res", res);
          return res?.data?.data?.id;
        })
      );
      const leaderRes = await userMutation.mutateAsync({
        ...leader,
        roles: ["foreign"],
      });
      console.log("leaderRes", leaderRes);
      const response = await eventParticipantMutation.mutateAsync({
        user: leaderRes?.data?.data?.id,
        event: leader.day,
        isLeader: true,
        relation: leader.relation,
        hasParking: leader.hasParking === 'Yes' ? true : false,
        team,
      });
      console.log("response", response);
      // const response = await eventParticipantMutation.mutateAsync()
      const { status } = response;
      setLoading(false)
      if (status === 200) {
        console.log("Successfully submitted");
        setTicketCount("");
        setTicketData("");
        setIsDisabled(true);
        isHidden.current.style.display = "none";
        sucAlert.current.style.display = "block";
      }
    } catch (err) {
      setLoading(false)
      isHidden.current.style.display = "none";
      falAlert.current.style.display = "block";
      console.error(err.message);
    }
  };

  const secondContainer = useRef();
  const isHidden = useRef();
  const sucAlert = useRef();
  const falAlert = useRef();
  const counterRef = useRef();

  const copy = useRef();

  useEffect(() => {
    console.log(daySelect);
    if (daySelect === true) {
      secondContainer.current.style.display = "flex";
    } else {
      secondContainer.current.style.display = "none";
    }
  }, [daySelect]);

  useEffect(() => {
    if (ticketCount === 15) {
      counterRef.current.style.color = "red";
    } else {
      counterRef.current.style.color = "black";
    }
  }, [ticketCount]);

  const options = [
    "بنر ها و پوستر های سطح شهر",
    "معرفی توسط مدرسه ، دانشگاه و محل کار",
    "فضای مجازی و شبکه های اجتماعی",
    "معرفی دوستان و آشنایان",
    "سایر",
  ];

  const copyText = () => {
    navigator.clipboard.writeText(5022291087040398);
    copy.current.innerText = "✔ کپی شد ";
  };

  return (
    <>
      {/* <ParticlesContainer /> */}
      <LoadingOverlay pos='fixed' visible={loading} />
      <div
        style={{ position: "fixed", top: ".2em", left: ".5em", zIndex: "10" }}
      >
        <Link href="/">
          <ActionIcon variant="filled">
            <ArrowBackIcon />
          </ActionIcon>
        </Link>
      </div>

      <form
        className="container needs-validation form-parent"
        onSubmit={handleSubmit}
        style={{ fontFamily: "Vazirmatn" }}
      >
        <div className="row row-t">
          <div className="form-container col-11 col-sm-11 col-md-9 col-lg-7 col-xl-5 col-xxl-5">
            <div
              class="alert alert-success mx-3 suc"
              role="alert"
              style={{ fontFamily: "Yekan" }}
              ref={sucAlert}
            >
              <h4 class="alert-heading mb-3">
                <i class="fa-solid fa-circle-check"></i> اطلاعات شما با موفقیت
                ثبت شد.
              </h4>
              <p>
                بلیت / بلیت های شما به شماره همراهتان پیامک خواهد شد؛ منتظر حضور
                گرمتان هستیم.
              </p>
              <hr />
              <p class="mb-0">
                <a
                  href="https://ble.ir/join/DwV18GhH6g"
                  target="blank"
                  className="btn btn-success m-1"
                >
                  کانال بله
                </a>
                <a
                  href="https://t.me/mesbah_artgroup"
                  target="blank"
                  className="btn btn-success m-1"
                >
                  کانال تلگرام
                </a>
                <hr />
                <button
                style={{width:'100%'}}
                  onClick={copyText}
                  type="button"
                  className="btn btn-success"
                >
                  <span>حمایت مالی</span>
                  <hr className="mx-1" />
                  <span>5022291087040398</span>
                  <br />
                  <span style={{ fontSize: "11px" }}> سیدمحمدحسن حسینی</span>
                  <br />
                  <span style={{ fontSize: "smaller" }} ref={copy}></span>
                </button>
                {/* <Link href="/PardakhtPage" className="btn btn-success m-1">
                  حمایت مالی
                </Link> */}
              </p>
            </div>
            <div
              class="alert alert-danger mx-3 fal"
              role="alert"
              style={{ fontFamily: "Yekan" }}
              ref={falAlert}
            >
              <h4 class="alert-heading mb-3">
                <i class="fa-solid fa-circle-exclamation"></i> متاسفانه در
                فرآیند خطایی رخ داده است.
              </h4>
              <p className="mt-3">
                لطفا دوباره تلاش کنید، یا با پشتیبانی تماس بگیرید.
              </p>
              <hr />
              <a href="tel:+989336683232" className="btn btn-danger m-1">
                تماس با پشتیبانی
              </a>
              <Link href="/" className="btn btn-danger m-1">
                تلاش دوباره
              </Link>
            </div>

            <div className="is-hidden" ref={isHidden}>
              <DaySelector dayS={dayS} setDayS={setDayS} />

              {/* <div
                style={{
                  textAlign: "right",
                  width: "90%",
                  marginBottom: "0.6rem",
                }}
              >
                از کدام طریق با ما آشنا شدید؟ <span className="imp">*</span>
              </div>
              <div
                className="form-floating"
                style={{ width: "90%", padding: ".2em 0 0 0" }}
              >
                <select
                  style={{ fontFamily: "Yekan" }}
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  onChange={(x) => {
                    setSelected(x.target.value);
                    setRelationA(true);
                  }}
                  value={selected}
                >
                  <option value={""} disabled>
                    --
                  </option>
                  {options.map((e) => {
                    return <option value={e}>{e}</option>;
                  })}
                </select>
                <label for="floatingSelect">لطفا یک گزینه را انتخاب کنید</label>
              </div> */}

              <div className="second-container" ref={secondContainer}>
                <div className="ticket-counter">
                  <label
                    htmlFor="counter"
                    className="form-label"
                    style={{ fontFamily: "Vazirmatn" }}
                  >
                    تعداد بلیت را مشخص کنید :{" "}
                  </label>
                  <br />
                  <span
                    style={{
                      fontFamily: "Yekan",
                      fontSize: "12px",
                      color: "gray",
                    }}
                  >
                    برای دریافت بیش از{" "}
                    <span
                      style={{
                        fontSize: "13px",
                        color: "red",
                      }}
                    >
                      15
                    </span>{" "}
                    بلیت (مدارس/سازمان ها) می‌بایست با پشتیبانی تماس بگیرید:
                  </span>
                  <a href="tel:+989336683232">
                    <span
                      className="posh-chip"
                      type="button"
                      style={{ fontFamily: "Yekan" }}
                    >
                      09336683232
                    </span>
                  </a>
                  {/* <p style={{
                      fontFamily: "Yekan",
                      fontSize: "15px",
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginTop: 20,
                      color: "green",
                    }}></p> */}
                  <div className="input-group" style={{ marginTop: "1em" }}>
                    <br />
                    <span
                      type="button"
                      id="t"
                      className="input-group-text"
                      style={{ borderRadius: "0 5px 5px 0" }}
                      onClick={() => handleCount(ticketCount + 1)}
                    >
                      <ArrowDropUpIcon />
                    </span>
                    <input
                      ref={counterRef}
                      type="text"
                      className="form-control"
                      id="counter"
                      // placeholder={ticketCount}
                      // inputMode="none"
                      aria-describedby="t"
                      value={ticketCount}
                      onChange={(x) => handleCount(x.target.value)}
                      style={{ fontFamily: "Yekan" }}
                    />
                    <span
                      type="button"
                      id="t"
                      className="input-group-text"
                      onClick={() => handleCount(ticketCount - 1)}
                    >
                      <ArrowDropDownIcon />
                    </span>
                  </div>
                </div>
                <div ref={ticketStatus}></div>
                {Array.from({ length: ticketCount }, (_, index) => (
                  <Ticket
                    key={index}
                    index={index}
                    onFirstName={handleFirstName}
                    onLastName={handleLastName}
                    onPhoneNumber={handlePhoneNumber}
                    onGender={handleGender}
                    ticketCount={ticketCount}
                    ticketData={ticketData}
                    setFirstNameA={setFirstNameA}
                    setLastNameA={setLastNameA}
                    setPhoneA={setPhoneA}
                    setGenderA={setGenderA}
                    phoneA={phoneA}
                    isDisabled={isDisabled}
                    firstNameA={firstNameA}
                    lastNameA={lastNameA}
                  />
                ))}
                <div
                  style={{
                    textAlign: "right",
                    width: "95%",
                    margin: "2em 0 0.6rem 0",
                  }}
                >
                  آیا با خودرو تشریف می‌آورید؟{" "}
                  <span style={{ fontSize: "13px" }}>(جهت مدیریت پارکینگ)</span>{" "}
                  <span className="imp">*</span>
                </div>

                <div
                  className="form-floating"
                  style={{ width: "95%", padding: ".2em 0 0 0" }}
                >
                  <select
                    style={{ fontFamily: "Yekan" }}
                    className="form-select"
                    id="car-floating"
                    aria-label="Floating label select example"
                    onChange={(x) => {
                      setIsCar(x.target.value);
                      setCarA(true);
                    }}
                    value={isCar}
                  >
                    <option value={""} disabled>
                      --
                    </option>
                    <option value="Yes">بله</option>
                    <option value="No">خیر</option>
                  </select>
                  <label for="car-floating">لطفا یک گزینه را انتخاب کنید</label>
                </div>
                <div
                  style={{
                    textAlign: "right",
                    width: "95%",
                    margin: "2em 0 0.6rem 0",
                  }}
                >
                  از کدام طریق با ما آشنا شدید؟ <span className="imp">*</span>
                </div>
                <div
                  className="form-floating"
                  style={{ width: "95%", padding: ".2em 0 0 0" }}
                >
                  <select
                    style={{ fontFamily: "Yekan" }}
                    className="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    onChange={(x) => {
                      setSelected(x.target.value);
                      setRelationA(true);
                    }}
                    value={selected}
                  >
                    <option value={""} disabled>
                      --
                    </option>
                    {options.map((e) => {
                      return <option value={e}>{e}</option>;
                    })}
                  </select>
                  <label for="floatingSelect">
                    لطفا یک گزینه را انتخاب کنید
                  </label>
                </div>

                <div
                  className="d-inline-block form-btn-parent"
                  tabIndex="0"
                  data-bs-toggle="popover"
                  data-bs-trigger="hover focus"
                  data-bs-content="popover"
                >
                  <button
                    style={{ zIndex: "100", width: "100%" }}
                    type="submit"
                    className="btn btn-danger form-btn"
                    onClick={handleSubmit}
                    popovertarget="form-popover"
                    disabled={isDisabled}
                  >
                    ثبت
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default TicketPage;
