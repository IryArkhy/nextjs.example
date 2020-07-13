import React from 'react'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

//route url: '/'
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle} < /title>
    < /Head>
    < section className={utilStyles.headingMd} >
            <p>Front - end Developer < /p>
        <p>
                (This is a sample website - you’ll be building a site like this on{' '}
                < a href="https://nextjs.org/learn" > our Next.js tutorial < /a>.)
          < /p>
          < /section>
        < section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                    <h2 className={utilStyles.headingLg}> Blog < /h2>
            < ul className={utilStyles.list} >
                        {
                          allPostsData.map(({ id, date, title }) => (
                            <li className={utilStyles.listItem} key={id} >
                              <Link href="/posts/[id]" as={`/posts/${id}`} >
                                <a>{title} < /a>
              < /Link>
              < br />
                                  <small className={utilStyles.lightText}>
                                    <Date dateString={date} />
                                  </small>
                  </li>
          ))}
</ul>
  </section>
  </Layout>
  )
}


export const getStaticProps: GetStaticProps = async (context) =>{
  const allPostsData = getSortedPostsData()
  return {
                        props: {
                        allPostsData
                      }
  }
}

//getStaticProps can only be exported from a page. You can’t export it from non-page files.

//To use Server-side Rendering, you need to export getServerSideProps instead of getStaticProps from your page.

// //export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     }
//   }
// }