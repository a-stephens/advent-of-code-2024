#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <algorithm>
#include <cmath>

int calc_distance(std::vector<int> lefts, std::vector<int> rights) {
    // sort
    std::sort(lefts.begin(), lefts.end());
    std::sort(rights.begin(), rights.end());

    int total_distance = 0;
    for (size_t i = 0; i < lefts.size(); ++i) {
        total_distance += abs(lefts.at(i) - rights.at(i));
    }
    return total_distance;
}

int calc_similarity(std::vector<int> lefts, std::vector<int> rights) {
    int total_similarity = 0;
    for (auto target : lefts) {
        total_similarity += target * std::count(rights.begin(), rights.end(), target);
    }
    return total_similarity;
}

int main(int argc, char* argv[]) {
    // arg parsing
    if (argc != 2) {
        std::cerr << "Incorrect number of args: " << argc << std::endl;
        return 1;
    }
    std::string filename = argv[1];
    std::cout << "Got filename: " << filename << std::endl;

    // read input
    std::ifstream input_file(filename);
    if (!input_file.is_open()) {
        std::cerr << "Error opening file." << std::endl;
        return 1;
    }

    int left, right;
    std::vector<int> lefts, rights;
    while (!input_file.eof()) {
        input_file >> left >> right;
        if (input_file.eof()) { break; }

        lefts.push_back(left);
        rights.push_back(right);
    }
    input_file.close();

    if (lefts.size() != rights.size()) {
        std::cerr << "The lefts and rights vectors should be the same size: "
            << lefts.size() << " " << rights.size() << std::endl;
        return 1;
    }
    std::cout << "Successfully read input." << std::endl;

    std::cout << "Total distance after pairing numbers: "
        << calc_distance(lefts, rights) << std::endl;
    std::cout << "Similarity score: "
        << calc_similarity(lefts, rights) << std::endl;

    return 0;
}
