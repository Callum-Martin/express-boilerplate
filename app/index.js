import AutoBind from 'auto-bind'

import './styles/index.scss'

import { compact, each, map } from 'lodash'

import { URLS } from './data/URL'

import Home from './pages/Home'

class App {
  constructor () {
    AutoBind(this)

    this.elements = []
    this.pages = []

    this.height = window.innerHeight
    this.width = window.innerWidth

    document.body.removeChild(document.querySelector('.app'))

    this.createHome()

    this.setup()

    this.render()
  }


  setup () {
    each(this.pages, page => {
      if (page.on) page.on('change', this.onChange)
    })

    each(this.elements, element => {
      if (element.on) element.on('change', this.onChange)
    })

    this.changeURL()
  }

  createHome () {
    this.home = new Home()
    this.pages.push(this.home)
  }

  changeURL () {
    const url = window.location.pathname.replace(/\/$/, '') || '/'
    this.onChange(url)
  }

  onChange (url, push = true) {
    if (this.isAnimating || this.url === url) return

    if (URLS.indexOf(url) === -1) {
      url = '/'
    }

    let promises = map(this.pages, page => {
      if ((page.url !== '/' && this.url.indexOf(page.url) !== -1) || page.url === this.url) {
        return page.hide()
      }
    })

    promises = compact(promises)

    each(this.elements, element => {
      element.onRoute(url)
    })

    this.url = url

    Promise.all(promises).then(() => {

      each(this.pages, page => {
        if ((page.url !== '/' && url.indexOf(page.url) !== -1) || page.url === url) {
          page.show()
        }
      })

      if (push) {
        window.history.pushState({ page: this.url }, 'Express Boilerplate', this.url)
      }

      if (this.cursor) {
        this.cursor.update()
      }
    })
  }

  render () {
    this.frame = window.requestAnimationFrame(this.render)
  }

}

new App()
