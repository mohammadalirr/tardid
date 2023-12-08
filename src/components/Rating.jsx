import { useCallback, useEffect } from "react";
import {
  Rating,
  useMantineTheme,
  rem,
  Accordion,
  Textarea,
} from "@mantine/core";
import {
  IconMoodEmpty,
  IconMoodCry,
  IconMoodSad,
  IconMoodSmile,
  IconMoodHappy,
  IconMoodCrazyHappy,
} from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";

const RatingCmp = ({ rateData, setRateData, explain, setExplain }) => {
  const handleRate = useCallback(
    (type, value) => {
      switch (type) {
        case "a":
          setRateData((prevData) => ({
            ...prevData,
            decor: value.toString(),
          }));
          break;
        case "b":
          setRateData((prevData) => ({
            ...prevData,
            noor: value.toString(),
          }));
          break;

        case "c":
          setRateData((prevData) => ({
            ...prevData,
            sout: value.toString(),
          }));
          break;

        case "d":
          setRateData((prevData) => ({
            ...prevData,
            bazi: value.toString(),
          }));
          break;

        case "e":
          setRateData((prevData) => ({
            ...prevData,
            lebas: value.toString(),
          }));
          break;

        case "f":
          setRateData((prevData) => ({
            ...prevData,
            namayeshnameh: value.toString(),
          }));
          break;

        case "g":
          setRateData((prevData) => ({
            ...prevData,
            entezamat: value.toString(),
          }));
          break;

        case "h":
          setRateData((prevData) => ({
            ...prevData,
            paziraei: value.toString(),
          }));
          break;

        case "i":
          setRateData((prevData) => ({
            ...prevData,
            samaneh: value.toString(),
          }));
          break;

        case "j":
          setRateData((prevData) => ({
            ...prevData,
            makan: value.toString(),
          }));
          break;

        case "k":
          setRateData((prevData) => ({
            ...prevData,
            kolly: value.toString(),
          }));
      }
    },
    [rateData]
  );

  const handleExplane = useCallback(
    (type, value) => {
      switch (type) {
        case "a":
          setExplain((prevData) => ({
            ...prevData,
            decorI: value,
          }));
          break;
        case "b":
          setExplain((prevData) => ({
            ...prevData,
            noorI: value,
          }));
          break;

        case "c":
          setExplain((prevData) => ({
            ...prevData,
            soutI: value,
          }));
          break;

        case "d":
          setExplain((prevData) => ({
            ...prevData,
            baziI: value,
          }));
          break;

        case "e":
          setExplain((prevData) => ({
            ...prevData,
            lebasI: value,
          }));
          break;

        case "f":
          setExplain((prevData) => ({
            ...prevData,
            namayeshnamehI: value,
          }));
          break;

        case "g":
          setExplain((prevData) => ({
            ...prevData,
            entezamatI: value,
          }));
          break;

        case "h":
          setExplain((prevData) => ({
            ...prevData,
            paziraeiI: value,
          }));
          break;

        case "i":
          setExplain((prevData) => ({
            ...prevData,
            samanehI: value,
          }));
          break;

        case "j":
          setExplain((prevData) => ({
            ...prevData,
            makanI: value,
          }));
          break;

        case "k":
          setExplain((prevData) => ({
            ...prevData,
            kollyI: value,
          }));
      }
    },
    [explain]
  );
  // useEffect(() => {
  //   console.log(rateData);
  // }, [rateData]);

  // useEffect(() => {
  //   console.log(explain);
  // }, [explain]);

  const getEmptyIcon = (value) => {
    const defaultProps = { size: rem(24), color: "gray" };
    switch (value) {
      case 1:
        return <IconMoodCry {...defaultProps} />;
      case 2:
        return <IconMoodSad {...defaultProps} />;
      case 3:
        return <IconMoodSmile {...defaultProps} />;
      case 4:
        return <IconMoodHappy {...defaultProps} />;
      case 5:
        return <IconMoodCrazyHappy {...defaultProps} />;
      default:
        return <IconMoodEmpty {...defaultProps} />;
    }
  };

  const getFullIcon = (value) => {
    const defaultProps = { size: rem(24) };
    const theme = useMantineTheme();

    switch (value) {
      case 1:
        return <IconMoodCry {...defaultProps} color={theme.colors.red[7]} />;
      case 2:
        return <IconMoodSad {...defaultProps} color={theme.colors.orange[7]} />;
      case 3:
        return (
          <IconMoodSmile {...defaultProps} color={theme.colors.yellow[7]} />
        );
      case 4:
        return <IconMoodHappy {...defaultProps} color={theme.colors.lime[7]} />;
      case 5:
        return (
          <IconMoodCrazyHappy {...defaultProps} color={theme.colors.green[7]} />
        );
      default:
        return <IconMoodEmpty {...defaultProps} />;
    }
  };

  const ratingArray = [
    {
      title: " دکور و طراحی صحنه",
      id: "a",
    },
    {
      title: "نور",
      id: "b",
    },
    {
      title: "صوت",
      id: "c",
    },
    {
      title: "بازی هنروران",
      id: "d",
    },
    {
      title: "طراحی لباس",
      id: "e",
    },
    {
      title: " نمایشنامه",
      sub: "کیفیت، گویایی",
      id: "f",
    },
    {
      title: "انتظامات",
      sub: "رفتار عوامل، نظم",
      id: "g",
    },

    {
      title: "پذیرایی",
      id: "h",
    },
    {
      title: "سامانه ثبت نام",
      sub: "",
      id: "i",
    },
    {
      title: "مکان برگزاری",
      sub: "آدرس، پارکینگ، کیفیت سالن",
      id: "j",
    },

    {
      title: "به طور کلی",
      id: "k",
    },
  ];

  return (
    <>
      <div className="rating-title">به هر یک از بخش های زیر امتیاز دهید.</div>
      <div className="rating-cnt mb-5">
        {ratingArray.map((x) => (
          <>
            <div className="box-cnt">
              <div className="box" id={x.id}>
                <div style={{ fontSize: "14px" }}>
                  {x.title} <br />{" "}
                  <span style={{ fontSize: "10px", color: "gray" }}>
                    {x.sub}
                  </span>
                </div>
                <Rating
                  className="rating"
                  emptySymbol={getEmptyIcon}
                  fullSymbol={getFullIcon}
                  highlightSelectedOnly
                  defaultValue={3}
                  onChange={(value) => handleRate(x.id, value)}
                />
              </div>
            </div>
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
                  <Accordion.Control>توضیحات (اختیاری)</Accordion.Control>
                  <Accordion.Panel>
                    <Textarea
                      className="textarea"
                      placeholder="بنویسید ..."
                      onChange={(y) => handleExplane(x.id, y.target.value)}
                      sx={{width:"100%"}}
                    />
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default RatingCmp;
