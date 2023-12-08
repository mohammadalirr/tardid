import { useCallback, useEffect, useState } from "react";
import RatingCmp from "~/components/Rating";
import { Select } from "@mantine/core";
import { Accordion, Textarea, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

const survey = () => {
  const [rateData, setRateData] = useState({
    decor: "3",
    noor: "3",
    sout: "3",
    bazi: "3",
    lebas: "3",
    namayeshnameh: "3",
    entezamat: "3",
    paziraei: "3",
    samaneh: "3",
    makan: "3",
    kolly: "3",
  });

  const [explain, setExplain] = useState({
    decorI: "",
    noorI: "",
    soutI: "",
    baziI: "",
    lebasI: "",
    namayeshnamehI: "",
    entezamatI: "",
    paziraeiI: "",
    samanehI: "",
    makanI: "",
    kollyI: "",
  });
  const [response, setResponse] = useState({
    tajrobeh: "",
    tajrobehI: "",
    hadiseDard: "",
    bashgah: "",
    entopish: "",
  });

  const handlePast = useCallback(
    (value: string) => {
      setResponse((prevData) => ({
        ...prevData,
        tajrobeh: value,
      }));
    },
    [response]
  );

  const handlePastI = useCallback(
    (value: string) => {
      setResponse((prevData) => ({
        ...prevData,
        tajrobehI: value,
      }));
    },
    [response]
  );

  const handleHadis = useCallback(
    (value: string) => {
      setResponse((prevData) => ({
        ...prevData,
        hadiseDard: value,
      }));
    },
    [response]
  );

  const handleBashgah = useCallback(
    (value: string) => {
      setResponse((prevData) => ({
        ...prevData,
        bashgah: value,
      }));
    },
    [response]
  );

  const handleEnoPish = useCallback(
    (value: string) => {
      setResponse((prevData) => ({
        ...prevData,
        entopish: value,
      }));
    },
    [response]
  );

  // useEffect(() => {
  //   console.log(response);
  // }, [response]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(rateData);
    console.log(explain);
    console.log(response);
  };

  return (
    <div className="srv-all">
      <div className="srv-ecnt">
        <form className="srv-icnt">
          <div className="srv-title">نظرسنجی نمایش آئینی تردید</div>
          <RatingCmp
            rateData={rateData}
            setRateData={setRateData}
            explain={explain}
            setExplain={setExplain}
          />
          <div className="rating-title">به سوالات پاسخ دهید.</div>

          <div className="rating-cnt py-5">
            <div className="label mb-1">
              آیا پیش از این نیز به تماشای نمایش آیینی نشسته بودید؟
            </div>
            <Select
              onChange={(value) => handlePast(value !== null ? value : "")}
              sx={{ direction: "rtl", width: "95%" }}
              placeholder="یک گزینه را انتخاب کنید"
              data={[
                { value: "بله", label: "بله" },
                { value: "خیر", label: "خیر" },
              ]}
            />
            <div style={{ width: "80%", marginBottom: "1em" }}>
              <Accordion
                chevron={<IconPlus size="1rem" />}
                styles={{
                  chevron: {
                    "&[data-rotate]": {
                      transform: "rotate(45deg)",
                    },
                  },
                }}
              >
                <Accordion.Item value="customization">
                  <Accordion.Control>
                    اگر بله، کمی بیشتر توضیح دهید
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Textarea
                      className="textarea"
                      placeholder="مثلا: نمایش سپاهیان آتش؛ مقایسه آن با نمایش تردید "
                      onChange={(x) => handlePastI(x.target.value)}
                      sx={{ width: "100%" }}
                    />
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="label mb-1">
              آیا پیش از این، نمایش حدیث درد را تماشا کرده اید؟
            </div>
            <Select
              sx={{ direction: "rtl", width: "95%" }}
              placeholder="یک گزینه را انتخاب کنید"
              data={[
                { value: "بله", label: "بله" },
                { value: "خیر", label: "خیر" },
              ]}
              onChange={(value) => handleHadis(value !== null ? value : "")}
            />
            <div className="label mb-1 mt-5">
              آیا مایلید تا به عنوان یکی از حامیان گروه مصباح، به طور ماهیانه
              این گروه را در مخارج یاری کنید؟
            </div>
            <Select
              sx={{ direction: "rtl", width: "95%" }}
              placeholder="یک گزینه را انتخاب کنید"
              data={[
                { value: "بله", label: "بله" },
                { value: "خیر", label: "خیر" },
              ]}
              onChange={(value) => handleBashgah(value !== null ? value : "")}
            />
            <Textarea
              className="textarea mt-5"
              placeholder="انتقادات، پیشنهادات و ..."
              onChange={(x) => handleEnoPish(x.target.value)}
              sx={{ width: "95%" }}
            />
            <Button
              style={{marginTop:"3em", width:'30%', fontFamily:"Yekan", fontSize:"larger"}}
              variant="gradient"
              onClick={handleSubmit}
              gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
              ثبت
            </Button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default survey;
