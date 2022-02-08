import React from 'react';
import './App.css';
import 'h8k-components';

import Articles from './components/Articles';

const title = "Sorting Articles";

function App({articles}) {
    const [ sortedArticles, setSortedArticles ] = React.useState([]); 

    React.useEffect(() => {
        const cleanedArticles = articles.filter((thing, index, self) => (
            index === self.findIndex((t) => (
                t.upvotes === thing.upvotes && t.date === thing.date
            ))
        ));
        let cloneArticles = Object.assign([], cleanedArticles)
        const sorted = cloneArticles.sort((a, b) => Number(b.upvotes) - Number(a.upvotes));
        setSortedArticles(sorted)
    }, [])

    const mostUpvoted = () => {
        let cloneArticles = Object.assign([], articles)
        const sorted = cloneArticles.sort((a, b) => Number(b.upvotes) - Number(a.upvotes));
        setSortedArticles(sorted);
    }

    const mostRecent = () => {
        let cloneArticles = Object.assign([], articles)
        const sorted = cloneArticles.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
        setSortedArticles(sorted);
    }

    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <div className="layout-row align-items-center justify-content-center my-20 navigation">
                <label className="form-hint mb-0 text-uppercase font-weight-light">Sort By</label>
                <button data-testid="most-upvoted-link" className="small" onClick={mostUpvoted}>Most Upvoted</button>
                <button data-testid="most-recent-link" className="small" onClick={mostRecent}>Most Recent</button>
            </div>
            <Articles articles={sortedArticles} />
        </div>
    );

}

export default App;
