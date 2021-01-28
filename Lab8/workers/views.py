from django.shortcuts import render

def fib(request):
    return render(request, 'fib.html')

def fac(request):
    return render(request, 'fac.html')

def pow(request):
    return render(request, 'pow.html')
