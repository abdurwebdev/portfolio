import React, { useEffect, useRef } from 'react'
import Marquee from "react-fast-marquee";
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import Cyl from './Cyl';
import { BsArrowUpRight } from "react-icons/bs";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)
import Lenis from '@studio-freight/lenis';
const App = () => {
  const cursorRef = useRef();
  const mainRef = useRef();
  const pagethreeRef = useRef();
  const meRef = useRef();
  useEffect(() => {
    const handleMouseEnter = () => {
      gsap.to(cursorRef.current, {
        opacity: 1,
        scale: 1
      })
    }
    const handleMouseLeave = () => {
      gsap.to(cursorRef.current, {
        opacity: 0,
        scale: 0
      })
    }
    const handleMouseMove = (dets) => {
      gsap.to(cursorRef.current, {
        x: dets.x,
        y: dets.y
      })
    }
    const main = mainRef.current;
    main.addEventListener("mouseenter", handleMouseEnter);
    main.addEventListener("mouseleave", handleMouseLeave);
    main.addEventListener("mousemove", handleMouseMove);
    return () => {
      main.removeEventListener("mouseenter", handleMouseEnter);
      main.removeEventListener("mouseleave", handleMouseLeave);
      main.removeEventListener("mousemove", handleMouseMove);
    }
  }, [])
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => t,
      smooth: true,
      smoothTouch: false,
    });

    const update = (time) => {
      lenis.raf(time);
      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);

    // Clean up on unmount
    return () => lenis.destroy();
  }, []);
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to("#loader", {
      opacity: 1,
      duration: 1
    })
    tl.fromTo("#loader h2", {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.4
    }, {
      opacity: 1,
      y: 0,
      stagger: 0.4
    })
    tl.to("#loader", {
      y: "-100%"
    })

    return () => {

    }
  }, [])
  useEffect(() => {
    gsap.fromTo(pagethreeRef.current, {
      opacity: 0,
      y: 50,

    }, {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: "#pagethree",
        start: "top 50%"
      }
    })

    return () => {

    }
  }, [])
  useEffect(() => {
    gsap.to(meRef.current, {
      x: "-10%",
      scrollTrigger: {
        trigger: "#maintwo",
        start: "top 50%",
        scrub: 1
      }
    })

    return () => {

    }
  }, [])


  return (
    <>
      <div id="loader" className='w-full  flex items-center justify-center flex-col  text-4xl text-black h-screen bg-[#fff] fixed top-0 left-0 z-50'>
        <h2>Abdurrehman's</h2>
        <h2>Portfolio</h2>
      </div>
      <div id='main' ref={mainRef} className='overflow-hidden'>
        <div ref={cursorRef} id="cursor" className='w-10 h-10 bg-white rounded-full hidden mix-blend-difference xl:fixed xl:block top-0 z-40 left-0'></div>
        <div id="pageone" className='w-full relative overflow-hidden min-h-screen bg-[#111111]'>
          <nav className='w-full px-5  h-14 py-10 text-white flex items-center justify-between'>
            <div>
              <h3 className='text-[2.5vw] sm:text-[2.5vw] md:text-[2.5vw] lg:text-[2.5vw] xl:text-[2vw] 2xl:text-[2.5vw] text-[#fff] font-extrabold'>AbdurRehman</h3>
            </div>
            <div>
              <button className='text-[2.5vw] sm:text-[2.5vw] md:text-[2.5vw] lg:text-[2.5vw] xl:text-[2vw] 2xl:text-[2.5vw] text-[#fff]'><h3>Download Resume</h3></button>
            </div>
          </nav>
          <div className='w-full px-5 rounded-3xl  text-white min-h-screen flex items-center justify-center absolute top-8'>
            <div className='absolute w-full z-10'>
              <Marquee>
                <h2 className='text-[5vw] ml-5'>FRONT END DEVELOPER</h2>
                <h2 className='text-[5vw] ml-5'>FRONT END DEVELOPER</h2>
              </Marquee>
            </div>
            <img className=' rounded-3xl lg:mt-10 xl:mt-0  z-20 w-[90%] md:w-[70%] lg:w-[45%] xl:w-[70%] object-cover' src="https://i.ibb.co/8gCTyJy/abdurmain.jpg" alt="" />
          </div>
        </div>
        <div id='maintwo' className='bg-[#111111]  w-[600%] flex items-center  text-yellow-200 translate-x-[-30%]  text-[5vw]'>
          <div ref={meRef} className='flex items-center'>
            <h2 className='ml-5'>ABDUR-REHMAN? </h2>
            <h2 className='ml-5'>ABDUR-REHMAN?</h2>
            <h2 className='ml-5'>ABDUR-REHMAN?</h2>
            <h2 className='ml-5'>ABDUR-REHMAN?</h2>
            <h2 className='ml-5'>ABDUR-REHMAN?</h2>
            <h2 className='ml-5'>ABDUR-REHMAN?</h2>
            <h2 className='ml-5'>ABDUR-REHMAN?</h2>
          </div>
        </div>
        <div id="pagetwo" className='w-full flex-col text-white flex items-start justify-center h-screen bg-[rgb(17,17,17)]'>
          <div className='flex w-full items-center justify-center'>
            <h3 className='text-[6vw]'><span className='text-[#38CDFA]'>Projects</span> I have <span className='text-[#FC626A]'>Worked</span> On.</h3>
          </div>
          <Canvas flat camera={{ fov: 65 }}>
            <OrbitControls enableZoom={false} />
            <ambientLight />
            <Cyl />
            <EffectComposer>
              <Bloom
                mipmapBlur
                intensity={0}
                luminanceThreshold={0}
                luminanceSmoothing={0} />
            </EffectComposer>
          </Canvas>
          <Marquee className='overflow-hidden'>
            <h2 className='text-[5vw] ml-3 font-extrabold'>LOCOMOTIVE JS</h2>
            <h2 className='text-[5vw] font-extrabold ml-3'>GSAP</h2>
            <h2 className='text-[5vw] font-extrabold ml-3'>HTML</h2>
            <h2 className='text-[5vw] font-extrabold ml-3'>CSS</h2>
            <h2 className='text-[5vw] font-extrabold ml-3'>JS</h2>
            <h2 className='text-[5vw] font-extrabold ml-3'>REACT JS</h2>

          </Marquee>
        </div>
        <div id="pagethree" className='w-full h-screen bg-[#111111] flex flex-col items-center text-white justify-center'>
          <h3 ref={pagethreeRef} className='sm:w-[50%] w-full px-5 text-center text-[3.5vw] sm:text-[2vw]'>Aoa <br />
            I'm Abdurrehman, a front-end developer with a passion for web design. I’ve cloned several impressive websites, including TwoGoodCo, Rejoice, and SidcupGolf, focusing on creating visually appealing and responsive layouts. My goal is to enhance user experience through clean, modern designs. If you're looking for a dedicated developer to help bring your ideas to life, let’s connect!
          </h3>
          <div className='flex mt-10 items-center justify-center gap-x-5'>
            <a href="https://www.instagram.com/abdurrehmanonig/" target='_blank'>
              <button className='px-8 py-3 rounded-full bg-[#58C2F9]'>Say Hi 👋</button>
            </a>
            <a href="https://github.com/abdurwebdev" target='_blank'><button className='flex gap-x-2 items-center px-8 py-3 rounded-full bg-[#FA5A5A]'>Watch My Repo <img src="https://i.pinimg.com/originals/60/5f/9d/605f9d4d4e1bef979969a2e56b6dfbe3.png" className='w-5 h-5 object-cover' alt="" /></button></a>
          </div>
        </div>
        <div id="pagefour" className='w-full px-5 pt-10 text-white min-h-screen bg-[#111111]'>
          <h3 className='text-[5vw] leading-[3vw]'>My <span className='text-[#38CDFA]'>Skills</span> Hobbies <br /><span className='text-[2vw] leading-3'>and</span> <span className='text-[2vw] leading-3'>Interests.</span></h3>
          <div className='flex mt-10 items-start justify-start gap-x-3'>
            <img className='w-20 h-20 object-cover' src="https://cdn3d.iconscout.com/3d/free/thumb/html-5728485-4781249.png" alt="" />
            <img className='w-20 h-20 object-cover' src="https://static.vecteezy.com/system/resources/previews/011/665/094/non_2x/stylized-3d-css-icon-side-view-free-png.png" alt="" />
            <img className='w-20 h-20 object-cover' src="https://static.vecteezy.com/system/resources/previews/012/697/298/non_2x/3d-javascript-logo-design-free-png.png" alt="" />
            <img src="https://cdn3d.iconscout.com/3d/free/thumb/react-native-5562339-4642743.png" className='w-20 h20 object-cover' alt="" />
          </div>
          <div className='px-0 flex mt-5 items-start justify-start'>
            <h3 className='text-[5vw]'>My Recent <span className='text-red-500'>Works</span></h3>
          </div>
          <div className='flex items-end mt-10 justify-end'>
            <img className='w-[800px] rounded-2xl h-96 object-cover' src="https://i.ibb.co/SXzTZwz/image.png" alt="" />
          </div>
          <div className='flex mt-10 items-start justify-start'>
            <img className='w-[850px] h-96 object-cover rounded-2xl' src="https://i.ibb.co/dpjrBPY/image.png" alt="" />
          </div>
          <div className='flex items-end mt-10 justify-end'>
            <img className='w-[800px] rounded-2xl h-96 object-cover' src="https://i.ibb.co/hDGZqZn/image.png" alt="" />
          </div>
        </div>
        <div id="pagefive" className='w-full text-white px-5 pt-10 min-h-screen bg-[#111111]'>
          <h3 className='text-[5vw]'>Watch My Websites <span className='text-red-500'>Live</span></h3>
          <div className='mt-10'>
            <a id='twogood' href="https://twogoodco2-0-yo99.vercel.app/" target='_blank' className='flex py-8 border-t border-white border-b w-[100%] px-3 text-[5vw]  items-center justify-between'>
              <div>
                <h4 className='relative z-50'>Two Good Co Clone</h4>
              </div>
              <div className='relative z-50 text-2xl'>
                <BsArrowUpRight />
              </div>
            </a>
          </div>
          <div className='mt-5'>
            <a id='twogood' href="https://twogoodco2-0-yo99.vercel.app/" target='_blank' className='flex py-8 border-t border-white border-b w-[100%] px-3 text-[5vw]  items-center justify-between'>
              <div>
                <h4 className='relative z-50'>REJOICE CLONE</h4>
              </div>
              <div className='relative z-50 text-2xl'>
                <BsArrowUpRight />
              </div>
            </a>
          </div>
          <div className='mt-5'>
            <a id='twogood' href="https://twogoodco2-0-yo99.vercel.app/" target='_blank' className='flex py-8 border-t border-white border-b w-[100%] px-3 text-[5vw]  items-center justify-between'>
              <div>
                <h4 className='relative z-50'>SIDCUP FAMILY GOLF Clone</h4>
              </div>
              <div className='relative z-50 text-2xl'>
                <BsArrowUpRight />
              </div>
            </a>
          </div>
        </div>
        <div id="pagesix" className='w-full pt-10  bg-[#111111] px-5  text-white'>
          <h3 className='text-[8vw] leading-[8vw]'>you can get in touch
            with me via <a href="mailto: iabdurrehman12345@gmail.com"><span className='text-yellow-300'>mail</span></a> or <a href="https://www.instagram.com/abdurrehmanonig/" target='_blank' id='third'><span className='text-pink-400'>instagram</span></a> or <span className='text-blue-500'>linkedIn.</span></h3>
          <div className='w-full mt-10 pb-5 text-2xl flex items-center justify-center '>
            <h3>Crafted with 💓 by me</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default App