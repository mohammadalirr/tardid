import { useState, useCallback, useEffect, useRef } from "react";
import Ticket from "../components/Ticket";
import DaySelector from "../components/DaySelector";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ActionIcon } from "@mantine/core";
import Link from "next/link";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";

let TicketPage = () => {
  const [ticketCount, setTicketCount] = useState(1);
  const [ticketData, setTicketData] = useState(
    Array(ticketCount).fill({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      gender: "",
      leader: "true",
      day: "",
      ticket: "",
    })
  );
  const [firstNameA, setFirstNameA] = useState(false);
  const [lastNameA, setLastNameA] = useState(false);
  const [phoneA, setPhoneA] = useState(false);
  const [genderA, setGenderA] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [daySelect, setDaySelect] = useState(false);
  const [dayS, setDayS] = useState();

  const ticketStatus = useRef();

  const handleCount = useCallback((count) => {
    if (count <= 50 && count > 0) {
      const isNumber = Number(count);
      setTicketCount(isNumber);
    } else {
      setTicketCount(1);
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
    newData[0] = { ...newData[0], ticket: ticketCount };
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
    if (firstNameA && lastNameA && phoneA && genderA) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [firstNameA, lastNameA, phoneA, genderA]);

  useEffect(() => {
    console.log(firstNameA);
  }, [firstNameA, lastNameA, phoneA, genderA]);

  // const server_URL = "http://localhost:9000";
  // const submit = (ticketData) => {
  //   const url = `${server_URL}/tasks`;
  //   // axios.post(url, ticketData);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(ticketData);

    const server_URL = "http://localhost:9000";
    const url = `${server_URL}/tasks`;

    try {
      const response = await axios.post(url, ticketData);
      const { status } = response;
      if (status === 201) {
        console.log("Successfully submitted");
        setTicketCount("");
        setTicketData("");
        setIsDisabled(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const secondContainer = useRef();

  useEffect(() => {
    console.log(daySelect);
    if (daySelect === true) {
      secondContainer.current.style.display = "flex";
    } else {
      secondContainer.current.style.display = "none";
    }
  }, [daySelect]);

  return (
    <>
      {/* <ParticlesContainer /> */}
      <div
        style={{ position: "fixed", top: ".2em", left: ".2em", zIndex: "10" }}
      >
        <Link href="/">
          <ActionIcon variant="filled">
            <ArrowBackIcon />
          </ActionIcon>
        </Link>
      </div>

      <form
        className="container needs-validation form-parent"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="row row-t">
          <div className="form-container col-11 col-sm-11 col-md-10 col-lg-8 col-xl-6 col-xxl-5">
            <DaySelector setDayS={setDayS} />

            <div className="second-container" ref={secondContainer}>
              <div className="ticket-counter">
                <label
                  htmlFor="counter"
                  className="form-label"
                  style={{ fontFamily: "Vazirmatn" }}
                >
                  تعداد بلیت :{" "}
                </label>
                <div className="input-group">
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
                    type="text"
                    className="form-control"
                    id="counter"
                    placeholder={ticketCount}
                    inputMode="none"
                    aria-describedby="t"
                    onChange={(x) => handleCount(x.target.value)}
                    style={{ fontFamily: "YekanBold" }}
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
                  // handleDayS={handleDayS}
                  // setHandleDayS={setHandleDayS}
                  isDisabled={isDisabled}
                  firstNameA={firstNameA}
                  lastNameA={lastNameA}
                  genderA={genderA}
                />
              ))}
              <span
                className="d-inline-block form-btn-parent"
                tabIndex="0"
                data-bs-toggle="popover"
                data-bs-trigger="hover focus"
                data-bs-content="Disabled popover"
              >
                <button
                  style={{ zIndex: "100" }}
                  type="submit"
                  className="btn btn-danger form-btn"
                  onClick={handleSubmit}
                  popovertarget="form-popover"
                  disabled={isDisabled}
                >
                  ثبت
                </button>
              </span>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default TicketPage;