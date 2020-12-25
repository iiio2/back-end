import React from 'react';

const MoviesList = ({ posts, addPost, updatePost, deletePost }) => {
  console.log(posts);

  return (
    <React.Fragment>
      <button onClick={addPost} className='btn btn-success'>
        Add
      </button>
      {posts.length === 0 ? (
        <p className='lead'>No more movies!</p>
      ) : (
        <table className='table table-striped mt-5'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>
                  {' '}
                  <strong>{post.title}</strong>{' '}
                </td>
                <td>
                  <button
                    onClick={() => updatePost(post)}
                    className='btn btn-sm btn-info'
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deletePost(post)}
                    className='btn btn-sm btn-danger'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </React.Fragment>
  );
};

export default MoviesList;
