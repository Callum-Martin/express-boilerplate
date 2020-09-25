import { Expo, TimelineMax } from 'gsap'
import { each } from 'lodash'

import Page from 'classes/Page'

import styles from './styles.scss'
import view from './view.pug'

export default class extends Page {
  constructor () {
    super({
      element: 'section',
      name: 'Home',
      url: '/'
    })

    this.element.className = `Home ${styles.home}`
    this.element.innerHTML = view({
      styles
    })

    this.elements = {
      title: this.element.querySelector('.Title'),
      underline: this.element.querySelector('.Underline svg'),
    }

  }

  show () {
    const timeline = new TimelineMax()

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const { title, underline } = this.elements

        const ease = Expo.easeOut

        timeline.set(this.element, {
          autoAlpha: 1
        })

        timeline.fromTo(title, 1.5, {
          autoAlpha: 0,
          y: 50
        }, {
          autoAlpha: 1,
          ease,
          delay: 1.5,
          y: 0
        })

        if (window.matchMedia("(min-width: 600px)").matches) {
        timeline.fromTo(underline, 1.5, {
          // autoAlpha: 0,
          x: 0,
          width: 0,
          scale: 2
        }, {
          // autoAlpha: 1,
          ease,
          delay: -1,
          x: 120,
          width: 240
        })

      } else {
      timeline.fromTo(underline, 1.5, {
        // autoAlpha: 0,
        x: 0,
        width: 0,
        scale: 1.3
      }, {
        // autoAlpha: 1,
        ease,
        delay: -1,
        x: 60,
        width: 400
      })
      }

      })
    })

    return super.show(timeline)
  }

  hide () {
    const { title } = this.elements

    const timeline = new TimelineMax()

    const ease = Expo.easeOut

    timeline.to(title, 0.6, {
      autoAlpha: 0,
      ease,
      y: -50
    })

    return super.hide(timeline)
  }
}
