from django.shortcuts import render, get_object_or_404
from django.contrib.auth.forms import UserCreationForm
from django.utils import timezone
from .models import Post

def post_list(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    return render(request, 'blog/post_list.html', {'posts': posts})

def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'blog/post_detail.html', {'post': post})

def post_delete(request,pk):
    if request.user.is_staff :
        Post.objects.filter(pk=pk).delete()
        return render(request, 'blog/post_delete.html', {})

def singup(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('post_list')
        else:
            form = UserCreationForm()
    return render(request, 'registration/singup.html')