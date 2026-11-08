import './App.css'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import posts from './posts'

const slides = ['1', '2', '3', '4', '5']

function Carousel({ items, className = '' }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((current) => (current + 1) % items.length)
    }, 5000)
    return () => clearTimeout(timer)
  }, [index, items.length])

  return (
    <div className={`carousel ${className}`.trim()}>
      <div className="carousel-slide">
        {items.map((item, i) => (
          <img
            key={item}
            src={`/carosel/${item}.png`}
            alt=""
            className={i === index ? 'slide-img active' : 'slide-img'}
          />
        ))}
      </div>
      <div className="carousel-dots">
        {items.map((item, i) => (
          <button
            key={item}
            type="button"
            className={i === index ? 'dot active' : 'dot'}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${item}`}
          />
        ))}
      </div>
    </div>
  )
}

const YOUTUBE_VIDEO_ID = 'REPLACE_WITH_VIDEO_ID'
const CONTACT_EMAIL = 'your.email@example.com'

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#contact" className="nav-button">Contact</a>
      <a href="#" className="nav-name">Ari Messinger</a>
      <a href="#blog" className="nav-button">Blog</a>
    </nav>
  )
}

function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function Blog({ slug }) {
  const post = slug ? posts.find((p) => p.slug === slug) : null

  if (slug && !post) {
    return (
      <>
        <Navbar />
        <main className="container">
          <section className="below-video">
            <h2>Post not found</h2>
            <p>
              <a href="#blog">Back to all posts</a>
            </p>
          </section>
        </main>
      </>
    )
  }

  if (post) {
    return (
      <>
        <Navbar />
        <main className="container">
          <article className="below-video post-article">
            <a href="#blog" className="back-link">← All posts</a>
            <h2>{post.title}</h2>
            <p className="post-date">{formatDate(post.date)}</p>
            <div className="post-body">
              <ReactMarkdown>{post.body}</ReactMarkdown>
            </div>
          </article>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <div className="blog-grid">
          <section className="below-video">
            <h2>Technical Blog</h2>
            {posts.length === 0 && <p>No posts yet.</p>}
            <ul className="post-list">
              {posts.map((p) => (
                <li key={p.slug}>
                  <a href={`#blog/${p.slug}`}>{p.title}</a>
                  <span className="post-date"> · {formatDate(p.date)}</span>
                  <p>{p.summary}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className="below-video">
            <h2>A couple of cool pictures!</h2>
            <Carousel items={slides} className="gallery-carousel" />
          </section>
        </div>
      </main>
    </>
  )
}

function Contact() {
  const [hasResume, setHasResume] = useState(null)

  useEffect(() => {
    fetch('/resume.pdf', { method: 'HEAD' })
      .then((res) => setHasResume(res.ok && (res.headers.get('content-type') || '').includes('pdf')))
      .catch(() => setHasResume(false))
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Portfolio message from ${data.get('name')}`)
    const body = encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('name')} <${data.get('email')}>`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <div className="contact-grid">
          <section className="below-video resume">
            <h2>Resume</h2>
            {hasResume && <iframe src="/resume.pdf" title="Resume" />}
            {hasResume === false && <p>No resume found. Add a file named resume.pdf to the public/ folder.</p>}
          </section>
          <div className="contact-left">
            <section className="below-video contact-info">
              <h2>Contact Info</h2>
              <p>
                Email: amessinger@student.leffellschool.org <br></br>
                Phone: +1 (914) 305-7617 <br></br>
                LinkedIn: <a href="https://www.linkedin.com/in/ari-messinger/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/ari-messinger/</a>
              </p>
            </section>
            <section className="below-video">
              <h2>Send Me a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <label>
                  Name
                  <input type="text" name="name" required />
                </label>
                <label>
                  Email
                  <input type="email" name="email" required />
                </label>
                <label>
                  Message
                  <textarea name="message" rows="5" required />
                </label>
                <button type="submit" className="nav-button">Send</button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

function App() {
  const [route, setRoute] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (route === '#contact') {
    return <Contact />
  }

  if (route === '#blog' || route.startsWith('#blog/')) {
    const slug = route === '#blog' ? null : decodeURIComponent(route.slice('#blog/'.length))
    return <Blog slug={slug} />
  }

  return (
    <>
      <Navbar />

      <main className="container">

      <header className="top">
        <section className="updates">
          <h2>Meet Lev, the LSP's first astronaut!</h2>
          <Carousel items={slides} />
          <p>
On October 20, 2026, The Leffell Space Program (LSP) launched HAB-2, its second ever high-altitude balloon mission! HAB-2 followed the success of our first mission, HAB-1, in May, which reached over 91,000 feet. On both projects, I led the design and assembly of our flight computers, and I led a systems team of 8 for HAB-2. <br /><br />
Ultimately, HAB-2’s success came not from the data that it collected, but the mere fact that it was recovered at all: 15 minutes before launch, our telemetry signal went out, and since our balloon was already inflated with Helium, we were left with no option other than to launch without telemetry. <br /><br />
We recovered a total of 6 packets of data during the flight, and eventually found the payload stuck in a tree about 0.25 miles off of a highway. After about an hour of attempted rescue, we called a tree service who guaranteed a recovery first thing the next morning. We received the payload back the next afternoon and were able to access our data and footage. In contrast to the 18 months that HAB-1 took to build, the design process for HAB-2 took about 7 weeks, demonstrating the LSP’s growth in efficiency. Read more about my contributions in my blog!



          </p>
        </section>

        <section className="about">
          <div className="video">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
              title="About Me video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="below-video">
            <h2>Recent Blog Post</h2>
            <p>
              Boilerplate text. Replace this with your own content describing
              the section.
            </p>
          </div>
        </section>
      </header>
      </main>
    </>
  )
}

export default App
