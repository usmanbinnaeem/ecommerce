/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect, useRef } from 'react'
import { css, jsx } from '@emotion/react'
import SliderContent from './SliderContent'
import Slide from './Slide'
import Arrows from './Arrows'
import Dots from './Dots'

const getWidth = () => window.innerWidth

/**
 * @function HomePageSlider
 */
const HomePageSlider = props => {
  const autoPlayRef = useRef()
  const transitionRef = useRef()
  const resizeRef = useRef()

  const { slides } = props

  const firstSlide = slides[0]
  const secondSlide = slides[1]
  const lastSlide = slides[slides.length - 1]

  const [state, setState] = useState({
    activeSlide: 0,
    translate: getWidth(),
    transition: 0.45,
    _slides: [lastSlide, firstSlide, secondSlide]
  })

  const { activeSlide, translate, _slides, transition } = state

  useEffect(() => {
    transitionRef.current = smoothTransition
    resizeRef.current = handleResize
    autoPlayRef.current = props.autoPlay ? nextSlide : null
  }, [])

  // Reactivate the transition that is removed in smoothTransition.
  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: 0.45 })
  }, [transition, state])

  // AutoPlay Slide
  useEffect(() => {
    if (props.autoPlay) {
      const play = () => {
        autoPlayRef.current()
      }

      const interval = setInterval(play, props.autoPlay * 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [props.autoPlay])

  // Smooth transitions
  useEffect(() => {
    const smooth = e => {
      // if (e.target.className.includes('SliderContent')) {
        transitionRef.current()
      // }
    }
  // Resize browser
    const resize = () => {
      resizeRef.current()
    }

    const transitionEnd = window.addEventListener('transitionend', smooth)
    const onResize = window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('transitionend', transitionEnd)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const handleResize = () => {
    setState({ ...state, translate: getWidth(), transition: 0 })
  }

  const smoothTransition = () => {
    let _slides = []

    // We're at the last slide.
    if (activeSlide === slides.length - 1)
      _slides = [slides[slides.length - 2], lastSlide, firstSlide]
    // We're back at the first slide.
    else if (activeSlide === 0) 
      _slides = [lastSlide, firstSlide, secondSlide]
    // Create an array of the previous last slide, and the next two slides that follow it.
    else 
      _slides = slides.slice(activeSlide - 1, activeSlide + 2)

    setState({
      ...state,
      _slides,
      transition: 0,
      translate: getWidth()
    })
  }

  const nextSlide = () => {

    setState({
      ...state,
      translate: translate + getWidth(),
      activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1
    })
  }

  const prevSlide = () => {

    setState({
      ...state,
      translate: 0,
      activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1
    })
  }

  return (
    <div css={SliderCSS}>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * _slides.length}
      >
        {_slides.map((_slide, i) => (
          <Slide width={getWidth()} key={_slide + i} content={_slide} />
        ))}
      </SliderContent>

      {props.autoPlay && (
        <>
          <Arrows direction="left" handleClick={prevSlide} />
          <Arrows direction="right" handleClick={nextSlide} />
        </>
      )}

      <Dots slides={slides} activeSlide={activeSlide} />
    </div>
  )
}

const SliderCSS = css`
  position: relative;
  height: 90vh;
  width: 98.7vw;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
`

export default HomePageSlider