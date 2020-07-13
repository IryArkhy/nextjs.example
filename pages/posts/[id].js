import Head from 'next/head'
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            {postData.title}
            <br />
            {postData.id}
            <br />
            {/* {postData.date} */}
            <Date dateString={postData.date} />
            {/* <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()//array of objects with possible paths
    return {
        paths,
        fallback: false
    }
}

//If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}