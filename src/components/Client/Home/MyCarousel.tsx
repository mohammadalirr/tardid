import Carousel from "react-spring-3d-carousel";
import { useState, useEffect, useMemo } from "react";
import { config } from "react-spring";
import Router from "next/router";

interface Props {
    cards: any[]
    width: string | number
    height: string | number
    margin: string | number
    showArrows?: boolean
}

export function MyCarousel(props: Props) {

  const [offsetRadius, setOffsetRadius] = useState(1);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState<number>(0);

  const table = useMemo(() => props.cards.map((element, index) => {
    return { ...element, onClick: () => {
      if (goToSlide === index) {
        Router.push(`/subCompanies?c=${element.key}`)
      } else {
        setGoToSlide(index)
      }
    } };
  }), [goToSlide]);

  useEffect(() => {
    setShowArrows(!!props.showArrows);
  }, [props.showArrows]);

  return (
    <div
      style={{ width: props.width, height: props.height, margin: props.margin }}
    >
      <Carousel
        slides={table}
        goToSlide={goToSlide}
        offsetRadius={4}
        showNavigation={showArrows}
        animationConfig={config.slow}
        offsetFn={(offsetFromCenter) => ({
          opacity: 1 - Math.abs(offsetFromCenter) / 10,
        })}
      />
    </div>
  );
}