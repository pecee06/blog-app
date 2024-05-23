// Rich Text Editor
import { Editor } from '@tinymce/tinymce-react'
import env from '../../env'
import { Controller } from 'react-hook-form'

const RTE = ({name="content", control, initialValue=""}) => {
  return (
    <Controller
        name={name}
        control={control}
        rules={{
            required: {
                value: true,
                message: "This is a required field"
            }
        }}
        render={({field: {onChange}})=>(
            <Editor
                initialValue={initialValue}
                onEditorChange={onChange}
                apiKey={env.RTE_API_KEY}
                init={{
                height: 340,
                menubar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        )}
    />
  )
}

export default RTE