import React from 'react'
import axios from 'axios'
import { queryCache, useMutation } from 'react-query'

export default function useSavePost() {
  return useMutation(
    (newPost) =>
      axios.patch(`/api/posts/${newPost.id}`, newPost).then((res) => res.data),
    {
      onSuccess: (newPost) => {
        queryCache.setQueryData(['posts', newPost.id], newPost)

        queryCache.setQueryData('posts', (old) =>
          old.map((d) => {
            if (d.id === newPost.id) {
              return newPost
            }
            return d
          })
        )
      },
    }
  )
}
