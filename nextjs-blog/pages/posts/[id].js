import Layout from '../../components/layout'
import {getAllPostIds, getPostData} from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Post({postData}) {
  return (
    <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
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

export async function getStaticPaths(){
    const paths = getAllPostIds()  //returns an array of objs that have params key which has obj with id key since [id].js
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}){
    const postData = await getPostData(params.id)  //params.id is from getStaticPaths. then the getPostData func returns the id and postData from the lib/posts.js
    return {
        props: {
            postData
        }
    }
}

//basically the rundown for this page is:
//getStaticPaths to get array of possible paths. it is an arr of objs with params key
//params is passed to getStaticProps
//postData is created based on the params id - gets the postData for that specific id
//props is set as postData which is passed to the Post component