import { useRef, useEffect } from "react";

const Ticket = ({
  onFirstName,
  onLastName,
  onPhoneNumber,
  index,
  onGender,
  ticketCount,
  ticketData,
  setFirstNameA,
  setLastNameA,
  setPhoneA,
  setGenderA,
  phoneA,
}) => {
  const targetId = `collapse-${index}`;

  const titleRef = useRef();
  const titleRefC = useRef();
  const footerRef = useRef();

  const firstRef = useRef(null);
  const lastRef = useRef();
  const numRef = useRef();
  const maleRef = useRef();
  const femaleRef = useRef();
  const kidRef = useRef();

  const childRef = useRef();

  const numLabel = useRef();

  const firstPoint = useRef();
  const lastPoint = useRef();
  const numPoint = useRef();
  const genderPoint = useRef();

  const radioRef = useRef();

  const numTitle = useRef();

  const ticketStatus = useRef();

  const persianPattern = /^[\u0600-\u06FF\s]+$/;
  const isValidNumber = /^09\d{9}$/;

  useEffect(() => {
    if (titleRefC.current.id === "title-0" && ticketCount !== 1) {
      titleRef.current.textContent = "سرگروه";
    } else {
      titleRef.current.textContent = `نفر ${index + 1}`;
    }

    if (titleRefC.current.id === "title-0") {
      numLabel.current.innerText = "*";
      childRef.current.style.display = "none";
      numTitle.current.style.marginBottom = ".5em";
    } else {
    }

    if (footerRef.current.className === "footer-0" && ticketCount !== 1) {
      footerRef.current.textContent =
        "بلیت ها به شماره این شخص پیامک خواهد شد.";
    } else if (
      footerRef.current.className === "footer-0" &&
      ticketCount === 1
    ) {
      footerRef.current.textContent = "بلیت به این شماره پیامک خواهد شد.";
    } else {
      footerRef.current.textContent = null;
    }
  }, [ticketCount]);

  useEffect(() => {
    if (
      firstRef.current.id === `first-name-${index}` &&
      firstRef.current.value.length > 2 &&
      persianPattern.test(firstRef.current.value)
    ) {
      firstRef.current.addEventListener("focusout", () => {
        firstPoint.current.textContent = "";
        firstRef.current.style.borderColor = "#A3CFBB";
        firstPoint.current.style.color = "#198754";

        setFirstNameA(true);
      });
      setFirstNameA(true);
    } else {
      firstRef.current.addEventListener("focusout", () => {
        firstPoint.current.textContent = "✘ نام خود را صحیح وارد کنید.";
        firstRef.current.style.borderColor = "#F1AEB5";
        firstPoint.current.style.color = "#DC3545";
        setFirstNameA(false);
      });
      setFirstNameA(false);
    }
  }, [ticketData]);

  useEffect(() => {
    if (
      lastRef.current.id === `last-name-${index}` &&
      lastRef.current.value.length > 2 &&
      persianPattern.test(lastRef.current.value)
    ) {
      lastRef.current.addEventListener("focusout", () => {
        lastPoint.current.textContent = "";
        lastRef.current.style.borderColor = "#A3CFBB";
        lastPoint.current.style.color = "#198754";
        setLastNameA(true);
      });
      setLastNameA(true);
    } else {
      lastRef.current.addEventListener("focusout", () => {
        lastPoint.current.textContent =
          " ✘ نام خانوادگی خود را صحیح وارد کنید. ";
        lastRef.current.style.borderColor = "#F1AEB5";
        lastPoint.current.style.color = "#DC3545";
        setLastNameA(false);
      });
      setLastNameA(false);
    }
  }, [ticketData]);

  useEffect(() => {
    if (
      numRef.current.id === `person-number-0` &&
      numRef.current.value.length === 11 &&
      isValidNumber.test(numRef.current.value)
    ) {
      numRef.current.addEventListener("focusout", () => {
        numPoint.current.textContent = "";
        numRef.current.style.borderColor = "#A3CFBB";
        numPoint.current.style.color = "#198754";
        genderPoint.current.textContent = "✘ وضعیت خود را مشخص کنید.";
        setPhoneA(true);
      });
      setPhoneA(true);
    } else if (numRef.current.id !== `person-number-0`) {
      setPhoneA(true);
    } else {
      numRef.current.addEventListener("focusout", () => {
        numPoint.current.textContent = "✘ شماره همراه خود را صحیح وارد کنید.";
        numRef.current.style.borderColor = "#F1AEB5";
        numPoint.current.style.color = "#DC3545";
      });
      setPhoneA(false);
    }
  }, [ticketData]);

  useEffect(() => {
    if (radioRef.current.id === `radio-${index}` && phoneA === true) {
      maleRef.current.addEventListener("input", () => {
        genderPoint.current.textContent = "";
        genderPoint.current.style.color = "#198754";
        setGenderA(true);
      });
      femaleRef.current.addEventListener("input", () => {
        genderPoint.current.textContent = "";
        genderPoint.current.style.color = "#198754";
        setGenderA(true);
      });
      kidRef.current.addEventListener("input", () => {
        genderPoint.current.textContent = "";
        genderPoint.current.style.color = "#198754";
        setGenderA(true);
      });
      setGenderA(false);
    } else {
      setGenderA(false);
    }
  }, [ticketData]);

  return (
    <>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${targetId}`}
              aria-expanded="true"
              aria-controls={targetId}
              style={{ fontFamily: "Yekan" }}
            >
              <span ref={titleRefC} id={`title-${index}`}>
                <i class="fa-solid fa-ticket fa-fade"></i>{" "}
                <span ref={titleRef}></span>
              </span>
            </button>
          </h2>
          <div
            id={targetId}
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div>
                <label className="form-label" htmlFor={`first-name-${index}`}>
                  نام <span className="imp">*</span>
                </label>
                <input
                  type="text"
                  className="form-control has-invalid"
                  id={`first-name-${index}`}
                  onChange={(x) => onFirstName(index, x.target.value)}
                  style={{ fontFamily: "Yekan" }}
                  autoComplete="off"
                  ref={firstRef}
                  required
                />
                <span ref={firstPoint} className="point"></span>
              </div>

              <div>
                <label
                  className="form-label mt-1"
                  htmlFor={`last-name-${index}`}
                >
                  نام خانوادگی <span className="imp">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`last-name-${index}`}
                  onChange={(x) => onLastName(index, x.target.value)}
                  style={{ fontFamily: "Yekan" }}
                  autoComplete="off"
                  required
                  ref={lastRef}
                />
              </div>
              <span ref={lastPoint} className="point"></span>
              <div>
                <label
                  ref={numTitle}
                  className="form-label mt-1"
                  htmlFor={`person-number-${index}`}
                >
                  شماره همراه <span ref={numLabel} className="imp"></span>
                  <br />
                  <span ref={footerRef} className={`footer-${index}`}></span>
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id={`person-number-${index}`}
                  onChange={(x) => onPhoneNumber(index, x.target.value)}
                  style={{ fontFamily: "Yekan" }}
                  autoComplete="off"
                  placeholder="مثلاً:  09120101010"
                  ref={numRef}
                />
                <span ref={numPoint} className="point"></span>
                <br />
              </div>
              <div className="radio-group" id={`radio-${index}`} ref={radioRef}>
                <div className="form-check form-check-inline">
                  <label
                    className="form-check-label"
                    htmlFor={`inlineRadio1${index}`}
                  >
                    آقا<span className="imp">*</span>
                  </label>

                  <input
                    className="form-check-input"
                    type="radio"
                    name={`inlineRadioOptions${index}`}
                    id={`inlineRadio1${index}`}
                    value="male"
                    onChange={(x) => onGender(index, x.target.value)}
                    required
                    ref={maleRef}
                  />
                </div>
                <div className="form-check form-check-inline">
                  <label
                    className="form-check-label"
                    htmlFor={`inlineRadio2${index}`}
                  >
                    خانم <span className="imp">*</span>
                  </label>

                  <input
                    className="form-check-input"
                    type="radio"
                    name={`inlineRadioOptions${index}`}
                    id={`inlineRadio2${index}`}
                    value="female"
                    onChange={(x) => onGender(index, x.target.value)}
                    required
                    ref={femaleRef}
                  />
                </div>
                <div className="form-check form-check-inline" ref={childRef}>
                  <label
                    className="form-check-label"
                    htmlFor={`inlineRadio3${index}`}
                  >
                    کودک (زیر 6 سال) <span className="imp">*</span>
                  </label>

                  <input
                    className="form-check-input"
                    type="radio"
                    name={`inlineRadioOptions${index}`}
                    id={`inlineRadio3${index}`}
                    value="child"
                    onChange={(x) => onGender(index, x.target.value)}
                    required
                    ref={kidRef}
                  />
                </div>

                <br />
                <span ref={genderPoint} className="point"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
