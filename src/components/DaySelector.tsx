import { useEffect, useMemo } from "react";
import { jdate } from "~/config/common";
import useDataById from "~/data/query/Base/useDataById";

const DaySelector = ({ dayS, setDayS }: any) => {
  const { data } = useDataById(
    "event",
    `list?title=${"نمایش آئینی تردید - آذر ۱۴۰۲"}`
  );

  const days = useMemo(
    () =>
      (data || [])
        ?.filter((e: any) => e.capacity > (e.participants?.lenght || 0))
        ?.filter((e: any) => e.active)
        .sort(
          (a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        .map((e: any) => ({
          date: jdate(e.date, "DD MMM"),
          id: e.id,
          value: 1,
        })),
    [data]
  );

  useEffect(() => {
    setDayS(days[0]?.id);
  }, [days]);

  return (
    <>
      <div className="selector-container">
        <label className="day-title mb-2">تاریخ حضورتان را مشخص کنید :</label>
        <br />
        <span
          className="footer-0"
          style={{ fontFamily: "Yekan", color:'red'}}
        >
          {/* نمایش در این شب‌ها از ساعت 19 تا 21 برگزار خواهد شد. */}
          این نمایش پایان یافته است.
        </span>
        <br />
        <div className="days">
          {days?.map((a: any) => (
            <>
              <div className="day-space" key={a.id}>
                <input
                  type="radio"
                  className="btn-check"
                  name="options-outlined"
                  id={`${a.id}-outlined`}
                  autoComplete="off"
                  value={a.id}
                  checked={dayS === a.id}
                  onChange={(a) => setDayS(a.target.value)}
                />
                <label
                  
                  style={{ fontSize: "14px"}}
                  className="btn btn-outline-light"
                  id={`radio-style-${a.id}`}
                  htmlFor={`${a.id}-outlined`}
                >
                  {a.date}
                </label>
              </div>
            </>
          ))}
        </div>
      </div>
      {/* <div className="form-floating">
              <select
              style={{fontFamily: "Yekan"}}
                className="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
              >
                <option selected>تاریخ برگزاری</option>

                {days.map((a) => (
                  <option value={a.value}>{a.date}</option>
                ))}
              </select>
              <label for="floatingSelect">انتخاب کنید</label>
            </div> */}
    </>
  );
};

export default DaySelector;
