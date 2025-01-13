import { ENVIRONMENT } from '../consts/environment.js'
import { userService } from './userService.js'

export const serieService = {
  async getAll () {
    const { token } = userService.getUser()
    try {
      const res = await fetch(`${ENVIRONMENT.API_HOST}/api/series`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })

      if (res.ok) {
        return await res.json()
      }

      if (res.status === 401) return { ok: false, message: 'Unauthorized' }

      return { ok: false, message: 'Internal server error' }
    } catch (_e) {
      return { ok: false, message: 'Internal server error' }
    }
  },

  async create (title, rating, description, isMiniSerie, numOfSeasons, year, genres, image) {
    const body = JSON.stringify({
      title,
      rating,
      description,
      isMiniSerie,
      numOfSeasons,
      year,
      genres,
      image
    })

    const { token } = userService.getUser()

    try {
      const res = await fetch(`${ENVIRONMENT.API_HOST}/api/series`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: body
      })

      if (res.ok) {
        const data = await res.json()
        return { ok: true, serie: data.serie }
      }
    } catch (_e) {
      return { ok: false, message: 'Internal server error' }
    }
  },

  async rate (rating, serieId) {
    const body = {
      rating
    }

    const { token } = userService.getUser()

    try {
      const res = await fetch(`${ENVIRONMENT.API_HOST}/api/series/${serieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      })

      if (res.ok) {
        const data = await res.json()
        return { ok: true, message: data.message }
      }
    } catch (_e) {
      return { ok: false, message: 'Internal server error' }
    }
  },

  async getSerieById (serieId) {
    const { token } = userService.getUser()

    try {
      const res = await fetch(`${ENVIRONMENT.API_HOST}/api/series/${serieId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      if (res.ok) {
        const data = await res.json()
        return {
          ok: true,
          message: {
            serie: data.serie,
          }
        }
      }

      if (res.status === 404) {
        return { ok: false, message: 'Serie no encontrada' }
      }

    } catch (_e) {
      return { ok: false, message: 'Internal server error' }
    }
  },

  async getTopRated () {
    const { token } = userService.getUser()

    try {
      const res = await fetch(`${ENVIRONMENT.API_HOST}/api/series/toprated`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })

      if (res.ok) {
        const data = await res.json()
        return { ok: true, message: {...data} }
      }
    } catch (_e) {
      return { ok: false, message: 'Internal server error' }
    }
  },

  async getAllGenres () {

    const { token } = userService.getUser()

    try {
      const res = await fetch(`${ENVIRONMENT.API_HOST}/api/genres`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })

      if (res.ok) {
        return await res.json()
      }
    } catch (_e) {
      return { ok: false, message: 'Internal server error' }
    }
  },

  async getAllSeriesByGenre (genre) {
    const { token } = userService.getUser()

    try {
      const res = await fetch(`${ENVIRONMENT.API_HOST}/api/series/genres/${genre}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })

      if (res.ok) {
        const data = await res.json()
        return {ok: true, message: {...data}}
      }
    } catch (_e) {
      return { ok: false, message: 'Internal server error' }
    }
  },

  async deleteOneSerie (id) {
    const { token } = userService.getUser()

    try {
      const res = await fetch(`${ENVIRONMENT.API_HOST}/api/series/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })

      if (res.ok) {
        const data = await res.json()
        return { ok: true, message: {...data} }
      }
    } catch (_e) {
      return { ok: false, message: 'Internal server error' }
    }
  },

  async uploadImage (file) {
    const { token } = userService.getUser()

    try {
      const formData = new FormData()
      formData.append('image', file)

      const res = await fetch(`${ENVIRONMENT.API_HOST}/api/images/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (res.ok) {
        const data = await res.json()
        return {
          ok: true,
          message: {...data}
        }
      }
    } catch (_e) {
      return { ok: false, message: 'Internal server error' }
    }
  },

  async getAllByUser () {
    const { token } = userService.getUser()

    try {
      const res = await fetch(`${ENVIRONMENT.API_HOST}/api/series/my-series`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      if (res.ok) {
        const data = await res.json()
        return {ok: true, message: {...data}}
      }
    } catch (_e) {
      return { ok: false, message: 'Internal server error' }
    }
  }
}