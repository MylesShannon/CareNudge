class SearchController < ApplicationController
    def doctors
        result = Doctor.where("lower(name) LIKE ?", "%#{search_params}%")
        if result.blank?
            result = Doctor.where("lower(specialty) LIKE ?", "%#{search_params}%")
            if result.blank?
                result = Doctor.where("lower(description) LIKE ?", "%#{search_params}%")
            end
        end
        render :json => result
    end

    def reviews
        result = Review.where("lower(description) LIKE ?", "%#{search_params}%")
        render :json => result
    end

    private
    def search_params
        params.require(:query).downcase
    end
end
