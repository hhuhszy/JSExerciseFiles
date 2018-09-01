$(document).ready(() => {
    $('#delete-article').on('click', (e) => {
        $target = $(e.target)
        const id = $target.attr('data-id')
        $.ajax({
            type: 'delete',
            url: '/article/' + id,
            success: (res) => {
                alert('Article Deleted')
                //redirect
                window.location.href = '/'
            },
            error: (err) => {
                console.log(err)
            }
        })
    })
})
