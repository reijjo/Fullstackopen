const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, blog) => {
		return sum + blog.likes
	}
	return blogs.length === 0
		? 0
		: blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	const mostLikes = blogs.reduce((prev, current) => {
		return prev.likes > current.likes
			? prev
			: current
	})
	return {
		title: mostLikes.title,
		author: mostLikes.author,
		likes: mostLikes.likes
	}
}

const mostBlogs = (blogs) => {
  const blogCounts = blogs.reduce((counts, blog) => {
    const author = blog.author;
    if (counts[author]) {
      counts[author]++;
    } else {
      counts[author] = 1;
    }
    return counts;
  }, {});

  const mostAuthor = Object.entries(blogCounts).reduce((max, [author, count]) => {
    if (count > max.count) {
      return { author, count };
    } else {
      return max;
    }
  }, { author: '', count: 0 }).author;

  const numBlogs = blogCounts[mostAuthor];

  return { author: mostAuthor, blogs: numBlogs };
}

const mostLikes = (blogs) => {
  // use reduce to count the total likes for each author
  const likeCounts = blogs.reduce((counts, blog) => {
    const author = blog.author;
    if (counts[author]) {
      counts[author] += blog.likes;
    } else {
      counts[author] = blog.likes;
    }
    return counts;
  }, {});

  // use reduce to find the author with the most likes
  const { author, likes } = Object.entries(likeCounts).reduce((max, [author, count]) => {
    if (count > max.likes) {
      return { author, likes: count };
    } else {
      return max;
    }
  }, { author: '', likes: 0 });

  // return an object with the author and the total likes for their blogs
  return { author, likes };
}

module.exports = {
	dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}