from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # GET, HEAD, OPTIONS → qualquer usuário logado pode ver
        if request.method in SAFE_METHODS:
            return True
        
        # POST, PUT, DELETE → só admin
        return request.user.is_staff