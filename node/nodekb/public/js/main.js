$(document).ready(() => {
    $('#delete-article').on('click', (e) => {
        $target = $(e.target)
        const id = $target.attr('data-id')
        $.ajax({
            type: 'delete',
            url: '/articles/' + id,
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
